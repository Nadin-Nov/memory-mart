import { FormWrapper } from '@/components/FormWrapper/FormWrapper';
import WrapperLayout from '@/components/Layout/WrapperLayout';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import ProgressSteps from '@/components/ProgressSteps/ProgressSteps';
import StepBillingAddress from '@/components/RegistrationSteps/StepBillingAddress';
import StepCredentials from '@/components/RegistrationSteps/StepCredentials';
import StepPersonalInfo from '@/components/RegistrationSteps/StepPersonalInfo';
import StepShippingAddress from '@/components/RegistrationSteps/StepShippingAddress';
import { getAnonymousToken, handleSignup } from '@/services/AuthService/AuthService';
import type { RegistrationFormProps, TokenResponse } from '@/services/AuthService/types';
import type { RawFormData } from '@/types/types';
import { normalizeFormData } from '@/utils/normalizeFormData';
import type { ReactElement } from 'react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const STEP_CREDENTIALS = 0;
const STEP_PERSONAL_INFO = 1;
const STEP_SHIPPING_ADDRESS = 2;
const STEP_BILLING_ADDRESS = 3;

const steps = [
  {
    title: 'Step 1',
    description: 'Credentials',
  },
  {
    title: 'Step 2',
    description: 'Personal info',
  },
  {
    title: 'Step 3',
    description: 'Shipping address',
  },
  {
    title: 'Step 4',
    description: 'Billing address',
  },
];

export default function RegistrationPage(): ReactElement {
  const methods = useForm<RawFormData>({ mode: 'onTouched' });
  const [step, setStep] = useState<number>(0);

  const navigate = useNavigate();

  const nextStep = (): void => setStep((previous) => previous + 1);

  const onSubmit = async (data: RawFormData): Promise<void> => {
    if (step < steps.length - 1) {
      nextStep(); // No need for void here since we're not returning anything
      return;
    }

    try {
      const normalizedData: RegistrationFormProps = normalizeFormData(data);
      console.log('Raw form data:', data);
      console.log('Normalized data:', normalizedData);

      const anonymousToken: TokenResponse | undefined = await getAnonymousToken();

      if (!anonymousToken) {
        console.error('Failed to get anonymous token');
        return;
      }

      try {
        const result = await handleSignup(anonymousToken.access_token, normalizedData);

        if (!result.success) {
          console.error('Signup failed:', result.error);
          return;
        }

        console.log('Signup successful:', result.data);
        navigate('/');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    } catch (error) {
      console.error('Unexpected error during signup:', error);
    }
  };

  return (
    <WrapperLayout>
      <FormProvider {...methods}>
        <FormWrapper
          onSubmit={(error) => {
            void methods.handleSubmit(onSubmit)(error);
          }}
          linkText='Login here'
          link='/login'
          name='Just a little bit and you’re there'
        >
          <ProgressSteps steps={steps} step={step} />
          {step === STEP_CREDENTIALS ? <StepCredentials /> : <></>}
          {step === STEP_PERSONAL_INFO ? <StepPersonalInfo /> : <></>}
          {step === STEP_SHIPPING_ADDRESS ? <StepShippingAddress /> : <></>}
          {step === STEP_BILLING_ADDRESS ? <StepBillingAddress /> : <></>}
          <PrimaryButton title={step < steps.length - 1 ? 'Next step' : 'Submit'} type='submit' />
        </FormWrapper>
      </FormProvider>
    </WrapperLayout>
  );
}
