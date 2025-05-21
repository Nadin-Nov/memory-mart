'use client';

import { Field, Portal, Select, createListCollection } from '@chakra-ui/react';
import type { SelectValueChangeDetails } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import type { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  options: Option[];
  control: Control<T>;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  errors?: FieldErrors<T>;
}

export const SelectField = <T extends FieldValues>({
  name,
  options,
  placeholder,
  label,
  isRequired = false,
  control,
  errors,
}: SelectFieldProps<T>): ReactElement => {
  const optionsCollection = createListCollection({ items: options });
  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <Field.Root invalid={!!errorMessage} required={isRequired}>
      {label && <Field.Label>{label}</Field.Label>}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select.Root
            name={field.name}
            value={field.value}
            onValueChange={({ value }: SelectValueChangeDetails) => field.onChange(value ?? '')}
            collection={optionsCollection}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder={placeholder} />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {optionsCollection.items.map((option) => (
                    <Select.Item item={option} key={option.value}>
                      {option.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      />

      {errorMessage && <Field.ErrorText>{errorMessage}</Field.ErrorText>}
    </Field.Root>
  );
};
