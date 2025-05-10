import { VStack, Spinner, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';

export default function LoadingSpinner(): ReactElement {
  return (
    <VStack colorPalette='teal'>
      <Spinner color='colorPalette.600' />
      <Text color='colorPalette.600'>Loading...</Text>
    </VStack>
  );
}
