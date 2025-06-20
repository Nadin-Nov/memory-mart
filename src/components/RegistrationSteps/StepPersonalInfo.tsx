import { InputField } from '@/components/InputField/InputField';
import { validateDate, validateName } from '@/utils/validate';
import { useFormContext } from 'react-hook-form';
import type { ReactElement } from 'react';

export default function StepPersonalInfo(): ReactElement {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <InputField
        name='firstName'
        placeholder='First name'
        register={register}
        validate={validateName}
        errors={errors}
      />
      <InputField name='lastName' placeholder='Last name' register={register} validate={validateName} errors={errors} />
      <InputField
        name='dateOfBirth'
        placeholder='Date of birth'
        register={register}
        validate={validateDate}
        errors={errors}
        type='date'
      />
    </>
  );
}
