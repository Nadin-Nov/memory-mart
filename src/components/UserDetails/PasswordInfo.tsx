import { Flex, VStack, Heading } from '@chakra-ui/react';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { PasswordField } from '../PasswordField/PasswordField';
import type { ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { validatePassword } from '@/utils/validate';
import { updateCustomerPassword } from '@/services/CustomerService';
import type { CustomerDetailsTypeWithToken } from '@/types/types';
import { LocalStorageService } from '@/services/LocalStorageService';
import { useAuth } from '@/context/useAuth';

const PasswordInfo = ({ customerDetails }: { customerDetails: CustomerDetailsTypeWithToken }): ReactElement => {
  const { token, version, email } = customerDetails;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const { login } = useAuth();

  const onSave = async (data: Record<string, string>): Promise<void> => {
    const { currentPassword, newPassword } = data;
    const updatedData = { version, currentPassword, newPassword };
    await updateCustomerPassword(token as string, updatedData);
    LocalStorageService.removeItem('userData');
    try {
      const result = await login(email, newPassword);

      if (result.success) {
        console.log('Re-authentication successful');
      } else {
        console.log('Re-authentication failed', result.error);
      }
    } catch (error) {
      console.error('Re-authentication error:', error);
    }
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
      <Heading size='md' color='darkText.subtle'>
        Password
      </Heading>
      <Flex width='full' gap='20px' direction='column'>
        <PasswordField
          name='currentPassword'
          register={register}
          errors={errors}
          validate={validatePassword}
          placeholder='Enter current password'
        />
        <PasswordField
          name='newPassword'
          register={register}
          errors={errors}
          validate={validatePassword}
          placeholder='Enter new password'
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

export default PasswordInfo;
