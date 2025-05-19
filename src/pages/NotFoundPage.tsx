import { Box, Heading, Text } from '@chakra-ui/react';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = (): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = (path: string): ((event: React.FormEvent) => void) => {
    return (event: React.FormEvent): void => {
      event.preventDefault();
      void navigate(path);
    };
  };
  return (
    <Box
      minHeight='100vh'
      bgImage={{
        base: "url('/assets/404mobile.png')",
        md: "url('/assets/404usual.png')",
      }}
      bgRepeat='no-repeat'
      backgroundSize='cover'
      backgroundPosition='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      gap={6}
      mt='10px'
      borderRadius='20px'
      overflow='hidden'
    >
      <Box display='flex' flexDirection='column' alignItems='center' gap={2}>
        <Heading
          fontFamily='heading'
          fontSize={{ base: '36px', md: '48px' }}
          fontWeight='400'
          lineHeight='20px'
          color='lightText.default'
          mb='40px'
        >
          Seems you’ve got lost
        </Heading>

        <Text fontFamily='body' fontSize='24px' fontWeight='400' lineHeight='20px' color='lightText.default' mb='30px'>
          Let’s get back home?
        </Text>

        <PrimaryButton title='Go to Home' onClick={handleNavigate('/')} />
      </Box>
    </Box>
  );
};

export default NotFoundPage;
