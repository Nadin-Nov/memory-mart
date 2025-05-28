'use client';
import { PasswordField } from '@/components/PasswordField/PasswordField';
import { FormWrapper } from '@/components/FormWrapper/FormWrapper';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { validateEmail, validatePassword } from '@/utils/validate';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { InputField } from '@/components/InputField/InputField';
import type { FormProps } from '@/services/AuthService/types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';
import { useEffect } from 'react';


const LoginPage = (): ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>({ defaultValues: { password: '' } });

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

   useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit: SubmitHandler<FormProps> = async (loginData: FormProps): Promise<void> => {
    try {
      const result = await login(loginData.email, loginData.password);

      if (result.success) {
        void navigate('/');
      } else {
        console.log('Login attempt failed', result.error);
      }
    } catch (error) {
      console.error('Authentication error:', error);
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
