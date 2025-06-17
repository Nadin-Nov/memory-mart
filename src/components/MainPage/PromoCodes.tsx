import { Box, Image } from '@chakra-ui/react';
import type { FC } from 'react';

const PromoCodes: FC = () => {
  return (
    <Box
      width='100%'
      maxW='1440px'
      display='flex'
      justifyContent='center'
      px={['20px', '40px']}
      lineHeight='0'
      m='0'
      p='0'
      background='none'
    >
      <Box
        width={['100%', '100%', '100%', '100%', '100%']}
        maxW={['100%', '600px', '600px', '600px', '900px']}
        lineHeight='0'
        mx={['auto', 'auto', 'auto', 'auto', '0']}
      >
        <Image src='/assets/promo.png' alt='Promo Codes' width='100%' height='auto' display='block' m='0' p='0' />
      </Box>
    </Box>
  );
};

export default PromoCodes;
