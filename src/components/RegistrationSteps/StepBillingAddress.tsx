import { InputField } from '@/components/InputField/InputField';
import { useFormContext } from 'react-hook-form';
import type { ReactElement } from 'react';
import { SelectField } from '../SelectField/SelectField';
import { validateCity, validatePostalCode, validateStreet } from '@/utils/validate';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import type { CountryCode } from '@/types/types';

const options = [
  { value: 'US', label: 'United States' },
  { value: 'BY', label: 'Belarus' },
  { value: 'RU', label: 'Russia' },
];

export default function StepBillingAddress(): ReactElement {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const country = watch('countryBilling') as CountryCode;

  // TODO: fix default value being US

  return (
    <>
      <SelectField name='countryBilling' control={control} placeholder='Country' options={options} errors={errors} />
      <InputField name='cityBilling' placeholder='City' register={register} errors={errors} validate={validateCity} />
      <InputField
        name='streetBilling'
        placeholder='Street'
        register={register}
        errors={errors}
        validate={validateStreet}
      />
      <InputField
        name='postalCodeBilling'
        placeholder='Postal code'
        register={register}
        errors={errors}
        validate={validatePostalCode(
          (Array.isArray(country) ? (country[0] ?? 'US') : typeof country === 'string' ? country : 'US') as CountryCode
        )}
      />
      <CheckboxField name='defaultBillingAddress' label='Set as default' control={control} />
    </>
  );
}
