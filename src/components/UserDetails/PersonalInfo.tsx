import { InputField } from '@/components/InputField/InputField';
import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, VStack, Heading } from '@chakra-ui/react';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import type { CustomerDetailsTypeWithToken, PersonalDetailsForm, PersonalDetailsUpdateRequest } from '@/types/types';
import { validateDate, validateName, validateEmail } from '@/utils/validate';
import { IconButton } from '@chakra-ui/react';
import { LuPencilLine } from 'react-icons/lu';
import { updateCustomerPersonalDetails } from '@/services/AuthService';
import { handleUpdateAction } from '@/utils/handleUpdateAction';

interface PersonalInfoProps {
  customerDetails: CustomerDetailsTypeWithToken;
  onUpdate: (updatedDetails: Partial<CustomerDetailsTypeWithToken>) => void;
}

const PersonalInfo = ({ customerDetails, onUpdate }: PersonalInfoProps): ReactElement => {
  const { token, version, email, firstName, lastName, dateOfBirth } = customerDetails;
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerDetailsTypeWithToken>();

  useEffect(() => {
    reset({
      firstName,
      lastName,
      dateOfBirth,
      email,
    });
  }, [firstName, lastName, dateOfBirth, email, reset]);

  function updatePersonalData(version: number, formData: PersonalDetailsForm): PersonalDetailsUpdateRequest {
    const updatedFirstName = handleUpdateAction('setFirstName', formData.firstName, firstName, 'firstName');
    const updatedLastName = handleUpdateAction('setLastName', formData.lastName, lastName, 'lastName');
    const updatedDateOfBirth = handleUpdateAction('setDateOfBirth', formData.dateOfBirth, dateOfBirth, 'dateOfBirth');
    const updatedEmail = handleUpdateAction('changeEmail', formData.email, email, 'email');

    const actions = [updatedFirstName, updatedLastName, updatedDateOfBirth, updatedEmail];

    return { version, actions };
  }

  const onSave = async (data: CustomerDetailsTypeWithToken): Promise<void> => {
    const updatedData = updatePersonalData(version, data);
    const updatedCustomer = await updateCustomerPersonalDetails(token as string, updatedData);
    onUpdate({ version: updatedCustomer?.version, firstName, lastName, email, dateOfBirth });
    setEditMode(false);
  };

  return (
    <VStack
      as='form'
      gap='40px'
      paddingX='clamp(30px, 10vw, 150px)'
      paddingY={50}
      maxWidth='50%'
      width='calc(100% - 3rem)'
    >
      <Flex alignItems='center'>
        <Heading size='md' color='darkText.subtle'>
          Personal Info
        </Heading>
        <IconButton variant='plain' size='2xl'>
          <LuPencilLine
            onClick={() => {
              setEditMode(!editMode);
            }}
          />
        </IconButton>
      </Flex>
      <Flex width='full' gap='40px' direction='column'>
        <InputField
          placeholder='First name'
          name='firstName'
          register={register}
          errors={errors}
          validate={validateName}
          variant={editMode ? 'subtle' : 'flushed'}
        />
        <InputField
          placeholder='Last name'
          name='lastName'
          register={register}
          errors={errors}
          validate={validateName}
          variant={editMode ? 'subtle' : 'flushed'}
        />
        <InputField
          placeholder='Date of birth'
          name='dateOfBirth'
          register={register}
          errors={errors}
          validate={validateDate}
          variant={editMode ? 'subtle' : 'flushed'}
        />
        <InputField
          placeholder='Email'
          name='email'
          register={register}
          errors={errors}
          validate={validateEmail}
          variant={editMode ? 'subtle' : 'flushed'}
        />
      </Flex>
      <PrimaryButton
        title='SAVE'
        onClick={(event) => {
          void handleSubmit(onSave)(event);
        }}
      />
    </VStack>
  );
};

export default PersonalInfo;
