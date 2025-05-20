import { Field, CheckboxRoot, CheckboxHiddenInput, CheckboxControl, CheckboxLabel } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import type { FieldValues, Control, FieldError, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  error?: FieldError;
  isDisabled?: boolean;
}

export const CheckboxField = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  isDisabled = false,
}: CheckboxFieldProps<T>): ReactElement => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field.Root invalid={!!error} disabled={isDisabled}>
          <CheckboxRoot
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
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
