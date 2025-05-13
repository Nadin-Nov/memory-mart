import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { PasswordInput } from '../ui/password-input';
import { Field } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface PasswordFieldProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  validate?: (value: string) => boolean | string;
}

export const PasswordField = ({ name, register, errors, validate }: PasswordFieldProps): ReactElement => {
  const errorMessage = errors?.[name]?.message;

  const errorText = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';

  return (
    <Field.Root invalid={!!errors?.[name]}>
      <PasswordInput {...register(name, { validate })} placeholder='Password' />
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
};
