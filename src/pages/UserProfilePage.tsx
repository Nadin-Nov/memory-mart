import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Flex, VStack } from '@chakra-ui/react';
import type { CustomerDetailsTypeWithToken } from '@/types/types';
import { LocalStorageService } from '@/services/LocalStorageService';
import { isUserData } from '@/utils/validateUserData';
import type { userData } from '@/utils/validateUserData';
import PersonalInfo from '@/components/UserDetails/PersonalInfo';
import { getCustomerDetails } from '@/services/AuthService';

const UserProfilePage = (): ReactElement => {
  const initialCustomerDetails = {
    token: '',
    version: 0,
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    password: '',
    addresses: [],
  };
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsTypeWithToken>(initialCustomerDetails);

  useEffect(() => {
    const fetchCustomerDetails = async (): Promise<void> => {
      try {
        const storedData = LocalStorageService.getItem<userData>('userData', isUserData);
        if (storedData) {
          const customerToken = storedData.token;
          const data = await getCustomerDetails(customerToken);
          if (data) {
            const { version, id, email, firstName, lastName, dateOfBirth, password, addresses } = data;
            setCustomerDetails({
              token: customerToken,
              version,
              id,
              email,
              firstName,
              lastName,
              dateOfBirth,
              password,
              addresses,
            });
          }
        }
      } catch (error) {
        console.log('Failed to fetch data', error);
      }
    };

    fetchCustomerDetails();
  }, []);

  const handleUpdateCustomerDetails = (updatedDetails: Partial<CustomerDetailsTypeWithToken>): void => {
    setCustomerDetails((previous: CustomerDetailsTypeWithToken) => ({ ...previous, ...updatedDetails }));
  };

  return (
    <Flex minHeight={650}>
      <PersonalInfo customerDetails={customerDetails} onUpdate={handleUpdateCustomerDetails} />
      <VStack
        as='form'
        gap='40px'
        paddingX='clamp(30px, 10vw, 150px)'
        paddingY={50}
        maxWidth='50%'
        width='calc(100% - 3rem)'
      ></VStack>
    </Flex>
  );
};

export default UserProfilePage;
