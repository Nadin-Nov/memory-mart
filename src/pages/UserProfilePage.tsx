import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import type { CustomerDetailsTypeWithToken } from '@/types/types';
import PersonalInfo from '@/components/UserDetails/PersonalInfo';
import { getCustomerDetails } from '@/services/CustomerService';
import { useAuth } from '@/context/useAuth';

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

  const { userData } = useAuth();

  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsTypeWithToken>(initialCustomerDetails);

  useEffect(() => {
    const fetchCustomerDetails = async (): Promise<void> => {
      try {
        if (userData?.token) {
          const data = await getCustomerDetails(userData?.token);
          if (data) {
            const { version, id, email, firstName, lastName, dateOfBirth, password, addresses } = data;
            setCustomerDetails({
              token: userData?.token,
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
  }, [userData?.token]);

  const handleUpdateCustomerDetails = (updatedDetails: Partial<CustomerDetailsTypeWithToken>): void => {
    setCustomerDetails((previous: CustomerDetailsTypeWithToken) => ({ ...previous, ...updatedDetails }));
  };

  return (
    <>
      <Flex minHeight={650}>
        <PersonalInfo customerDetails={customerDetails} onUpdate={handleUpdateCustomerDetails} />
      </Flex>
    </>
  );
};

export default UserProfilePage;
