import { Box, Heading, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

const MainPage = (): ReactElement => {
  return (
    <Box
      width='100%'
      maxW='1440px'
      mx='auto'
      position='relative'
      height='629px'
      backgroundImage="url('/assets/main-bg3.png')"
      backgroundPosition='top center'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
    >
      <Box
        position='absolute'
        top='0'
        left='0'
        right='0'
        bottom='0'
        px='40px'
        pt={['200px', undefined, '200px']}
        textAlign='left'
        zIndex='1'
      >
        <Text
          fontFamily='heading'
          fontWeight='400'
          fontSize={['14px', '15px', '15px', '16px']}
          lineHeight='40px'
          letterSpacing='4%'
          color='lightText.default'
          mb='4'
        >
          welcome to the memory shop
        </Text>

        <Heading
          as='h1'
          fontFamily='heading'
          fontWeight='500'
          fontSize={['24px', '28px', '32px', '36px']}
          lineHeight='40px'
          letterSpacing='4%'
          color='lightText.default'
          maxW='90%'
        >
          dreamy relics from the heart’s attic
        </Heading>
      </Box>
    </Box>
  );
};

export default MainPage;
