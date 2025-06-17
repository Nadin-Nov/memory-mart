import { Box } from '@chakra-ui/react';
import type { JSX } from 'react';

interface CartBadgeProps {
  count: number;
}

const CartBadge = ({ count }: CartBadgeProps): JSX.Element | undefined => {
  if (count < 0) return undefined;

  return (
    <Box
      position='absolute'
      top='-6px'
      right='-6px'
      bg='teal.500'
      color='white'
      fontSize='10px'
      fontWeight='bold'
      borderRadius='full'
      width='16px'
      height='16px'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='1'
      pointerEvents='none'
    >
      {count}
    </Box>
  );
};

export default CartBadge;
