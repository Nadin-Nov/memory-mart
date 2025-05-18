import { Box, Heading, Text } from '@chakra-ui/react';
import { PrimarySpaButton } from '../components/PrimaryButton/PrimarySpaButton';
import type { ReactElement } from 'react';

const NotFoundPage = (): ReactElement => {
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

        <PrimarySpaButton link='/' title='Go to Home' />
      </Box>
    </Box>
  );
};

export default NotFoundPage;
