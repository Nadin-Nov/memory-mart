import { InputField } from '@/components/InputField/InputField';
import { useFormContext } from 'react-hook-form';
import type { ReactElement } from 'react';
import { SelectField } from '../SelectField/SelectField';
import { validateCity, validatePostalCode, validateStreet } from '@/utils/validate';
import { useEffect } from 'react';
import { CheckboxField } from '../CheckboxField/CheckboxField';
import type { CountryCode } from '@/types/types';

const options = [
  { value: 'US', label: 'United States' },
  { value: 'BY', label: 'Belarus' },
  { value: 'RU', label: 'Russia' },
];

export default function StepShippingAddress(): ReactElement {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const country = watch('countryShipping') as CountryCode;
  const city = watch('cityShipping');
  const street = watch('streetShipping');
  const postalCode = watch('postalCodeShipping');
  const copyBilling = watch('copyToBilling');

  useEffect(() => {
    if (copyBilling) {
      setValue('countryBilling', country);
      setValue('cityBilling', city);
      setValue('streetBilling', street);
      setValue('postalCodeBilling', postalCode);
    }
  }, [copyBilling, country, city, street, postalCode, setValue]);

  return (
    <>
      <SelectField name='countryShipping' control={control} placeholder='Country' options={options} errors={errors} />
      <InputField name='cityShipping' placeholder='City' register={register} errors={errors} validate={validateCity} />
      <InputField
        name='streetShipping'
        placeholder='Street'
        register={register}
        errors={errors}
        validate={validateStreet}
      />
      <InputField
        name='postalCodeShipping'
        placeholder='Postal code'
        register={register}
        errors={errors}
        validate={validatePostalCode(
          (Array.isArray(country) ? (country[0] ?? 'US') : typeof country === 'string' ? country : 'US') as CountryCode
        )}
      />

      <CheckboxField name='copyToBilling' label='Billing address is the same' control={control} />
      <CheckboxField name='defaultShippingAddress' label='Set as default' control={control} />
    </>
  );
}
