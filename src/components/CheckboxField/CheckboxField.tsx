'use client';

import { CheckboxControl, CheckboxHiddenInput, CheckboxLabel, CheckboxRoot, Field } from '@chakra-ui/react';
import type { Control, FieldError, FieldValues } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import type { ReactElement } from 'react';

interface CheckboxFieldProps {
  name: string;
  label: string;
  control: Control<FieldValues>;
  error?: FieldError;
  isDisabled?: boolean;
}

export const CheckboxField = ({
  name,
  label,
  control,
  error,
  isDisabled = false,
}: CheckboxFieldProps): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field.Root invalid={!!error} disabled={isDisabled}>
          <CheckboxRoot
            checked={field.value}
            onCheckedChange={({ checked }) => field.onChange(checked)}
            colorPalette={'teal'}
          >
            <CheckboxHiddenInput />
            <CheckboxControl />
            <CheckboxLabel>{label}</CheckboxLabel>
          </CheckboxRoot>
          <Field.ErrorText>{error?.message}</Field.ErrorText>
        </Field.Root>
      )}
    />
  );
};
