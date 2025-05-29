import type { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { PasswordInput } from '../ui/password-input';
import { Field } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface PasswordFieldProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validate?: (value: string) => boolean | string;
}

export const PasswordField = <T extends FieldValues>({
  name,
  register,
  errors,
  validate,
}: PasswordFieldProps<T>): ReactElement => {
  const errorMessage = errors?.[name]?.message;

  const errorText = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';

  return (
    <Field.Root invalid={!!errors?.[name]}>
      <PasswordInput {...register(name, { validate })} placeholder='Password' />
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
};
