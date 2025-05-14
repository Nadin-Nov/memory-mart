import { Box, Heading } from '@chakra-ui/react';
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
    >
      <Heading
        color='primary.solid'
        fontSize={{ base: '2xl', md: '4xl' }}
        fontFamily='heading'
        textAlign='center'
        px='20px' //
      >
        404 - Page Not Found
      </Heading>
    </Box>
  );
};

export default NotFoundPage;
