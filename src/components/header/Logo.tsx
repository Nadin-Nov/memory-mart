import { Box, Text, Image } from '@chakra-ui/react';
import logoImage from '@/assets/memory-mart_logo.webp';
import type { JSX } from 'react';

const Logo = (): JSX.Element => {
  return (
    <Box display='flex' alignItems='center' whiteSpace='nowrap'>
      <Image src={logoImage} alt='Logo' boxSize={{ base: '40px', md: '50px' }} mr={4} />
      <Text
        fontFamily='heading'
        fontWeight='400'
        fontSize={{ base: '24px', md: '36px' }}
        lineHeight='1'
        color='primary.solid'
      >
        Memory Shop
      </Text>
    </Box>
  );
};

export default Logo;
