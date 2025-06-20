import { InputField } from '@/components/InputField/InputField';
import { PasswordField } from '@/components/PasswordField/PasswordField';
import { validateEmail, validatePassword } from '@/utils/validate';
import { useFormContext } from 'react-hook-form';
import type { ReactElement } from 'react';

export default function StepCredentials(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <InputField name='email' placeholder='Email' register={register} validate={validateEmail} errors={errors} />
      <PasswordField name='password' register={register} validate={validatePassword} errors={errors} />
    </>
  );
}
