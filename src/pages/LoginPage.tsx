'use client';
import { PasswordField } from '@/components/PasswordField/PasswordField';
import { FormWrapper } from '@/components/FormWrapper/FormWrapper';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { validateEmail, validatePassword } from '@/utils/validate';
import type { ReactElement } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { InputField } from '@/components/InputField/InputField';
import type { TokenResponse, FormProps } from '@/services/AuthService/types';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from '@/services/LocalStorageService';
import { handleLogin, getCustomerToken } from '@/services/AuthService/AuthService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';

const LoginPage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ defaultValues: { password: '' } });

  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn: boolean | undefined = LocalStorageService.getItem<userData>('userData', isUserData)?.isLoggedIn;

    if (isLoggedIn) {
      void navigate('/');
    }
  }, [navigate]);

  const onSubmit: SubmitHandler<FormProps> = async (loginData: FormProps): Promise<void> => {
    try {
      const response = (await getCustomerToken(loginData)) as TokenResponse;
      const customerToken = response.access_token;

      const loginResult = await handleLogin(customerToken, loginData);

      if (loginResult.success) {
        LocalStorageService.setItem('userData', {
          token: customerToken,
          isLoggedIn: true,
        });
        await navigate('/');
      } else {
        console.log('Login attempt failed', loginResult.error);
        return;
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return;
    }
  };

  return (
    <FormWrapper
      isLogin
      name="Let's shop for the past"
      linkText='Aren’t registered just yet?'
      link='/registration'
      onSubmit={(event) => {
        handleSubmit(onSubmit)(event).catch((error) => {
          console.error("Can't submit the form:", error);
        });
      }}
    >
      <InputField
        name='email'
        placeholder='Email'
        required
        register={register}
        errors={errors}
        validate={validateEmail}
      />
      <PasswordField name='password' register={register} errors={errors} validate={validatePassword} />
      <PrimaryButton title='SIGN IN' type='submit' />
    </FormWrapper>
  );
};

export default LoginPage;
