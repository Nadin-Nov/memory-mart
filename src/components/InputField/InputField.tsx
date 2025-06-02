import type { FieldErrors, FieldValues, UseFormRegister, Path } from 'react-hook-form';
import { Field, Input } from '@chakra-ui/react';
import type { HTMLInputTypeAttribute, ReactElement } from 'react';

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder: string;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
  validate?: (value: string) => boolean | string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  variant?: 'flushed' | 'subtle' | 'outline';
  readOnly?: boolean;
}

export const InputField = <T extends FieldValues>({
  name,
  placeholder,
  required = false,
  register,
  errors,
  validate,
  type = 'text',
  variant = 'flushed',
  readOnly = false,
}: InputFieldProps<T>): ReactElement => {
  const errorMessage = errors?.[name]?.message;

  const errorText = typeof errorMessage === 'string' ? errorMessage : 'An error occurred';

  return (
    <Field.Root invalid={!!errors?.[name]} required={required}>
      <Input
        {...register(name, { validate })}
        placeholder={placeholder}
        variant={variant}
        type={type}
        readOnly={readOnly}
      />
      <Field.ErrorText>{errorText}</Field.ErrorText>
    </Field.Root>
  );
};
