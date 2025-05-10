import { Box, Text, Image } from '@chakra-ui/react';

import logoImage from '@/assets/memory-mart_logo.webp';
import type { JSX } from 'react';

const Logo = (): JSX.Element => {
  return (
    <Box display='flex' alignItems='center'>
      <Image src={logoImage} alt='Logo' boxSize='50px' mr={4} />
      <Text fontFamily='heading' fontWeight='400' fontSize='36px' lineHeight='22px' color='primary.solid'>
        Memory Shop
      </Text>
    </Box>
  );
};

export default Logo;
