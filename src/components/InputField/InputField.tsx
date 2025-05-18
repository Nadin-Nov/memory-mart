import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { Field, Input } from '@chakra-ui/react';
import type { HTMLInputTypeAttribute, ReactElement } from 'react';

interface InputFieldProps {
  name: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  validate?: (value: string) => boolean | string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const InputField = ({
  name,
  placeholder,
  required = false,
  register,
  errors,
  validate,
  type = 'text',
}: InputFieldProps): ReactElement => {
  const errorMessage = errors?.[name]?.message;

  const errorText = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';

  return (
    <Field.Root invalid={!!errors?.[name]} required={required}>
      <Input {...register(name, { validate })} placeholder={placeholder} variant='flushed' type={type} />
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
};
