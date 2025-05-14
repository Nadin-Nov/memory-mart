import { Box, Heading, Text } from '@chakra-ui/react';
import { PrimaryButton } from 'c:/clone/memory-mart/memory-mart/src/components/PrimaryButton/PrimaryButton';
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
      justifyContent='space-between'
      alignItems='center'
    >
      <Heading
        mt='100px'
        fontFamily='heading'
        fontSize='48px'
        fontWeight='400'
        lineHeight='20px'
        color='lightText.default'
      >
        Seems you’ve got lost
      </Heading>

      <Box display='flex' flexDirection='column' alignItems='center' mb='10vh'>
        <Text fontFamily='body' fontSize='24px' fontWeight='400' lineHeight='20px' color='lightText.default' mb={4}>
          Let’s get back home?
        </Text>

        <PrimaryButton link='/' title='Go to Home' />
      </Box>
    </Box>
  );
};

export default NotFoundPage;
