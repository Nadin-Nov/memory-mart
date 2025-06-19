import { Box, Text, Button, Flex } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { createPortal } from 'react-dom';

interface CartPortalProps {
  onConfirm: () => Promise<void>;
  onCancel: () => void;
  message: string;
}

export const CartPortal = ({ onConfirm, onCancel, message }: CartPortalProps): ReactElement => {
  return createPortal(
    <Box
      position='fixed'
      top='0'
      left='0'
      right='0'
      bottom='0'
      backgroundColor='rgba(0,0,0,0.5)'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex='9999'
    >
      <Box bg='white' padding={6} borderRadius='md' boxShadow='lg' maxWidth='380px' width='100%'>
        <Text marginBottom='4' fontSize='md'>
          {message}
        </Text>
        <Flex justify='flex-end' gap='4'>
          <Button variant='outline' borderRadius={10} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            bg='primary.solid'
            color='primary.contrast'
            borderRadius={10}
            _hover={{ bg: 'primary._hover' }}
          >
            OK
          </Button>
        </Flex>
      </Box>
    </Box>,
    document.body
  );
};
