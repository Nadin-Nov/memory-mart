import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Field, Input } from '@chakra-ui/react';
import type { ReactElement } from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  validate?: (value: string) => boolean | string;
}

export const InputField = ({ name, placeholder, register, errors, validate }: InputFieldProps): ReactElement => {
  const errorMessage = errors?.[name]?.message;

  const errorText = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';

  return (
    <Field.Root invalid={!!errors?.[name]}>
      <Input {...register(name, { validate })} placeholder={placeholder} variant='flushed' />
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
};
