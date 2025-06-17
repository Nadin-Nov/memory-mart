import { Box } from '@chakra-ui/react';
import type { FC } from 'react';

const PromoCodesReminder: FC = () => (
  <Box
    mt='12px'
    textAlign='center'
    fontSize='10px'
    color='gray.400'
    fontStyle='italic'
    letterSpacing='0.05em'
    display='flex'
    flexWrap='wrap'
    justifyContent='center'
    gap='4px'
    userSelect='text'
    flexDirection={['column', 'column', 'row']}
  >
    <Box as='span' fontWeight='600' whiteSpace='nowrap'>
      Don’t forget your promo codes:
    </Box>
    <Box as='span' fontWeight='600' whiteSpace='nowrap' ml={[0, 0, '8px']}>
      RSSCHOOLMEMORIES
    </Box>
    <Box as='span' fontWeight='600' whiteSpace='nowrap' ml={[0, 0, '8px']}>
      MAKEYOUROWNMAGIC
    </Box>
    <Box as='span' fontWeight='600' whiteSpace='nowrap' ml={[0, 0, '8px']}>
      MAGICISREAL
    </Box>
  </Box>
);

export default PromoCodesReminder;
