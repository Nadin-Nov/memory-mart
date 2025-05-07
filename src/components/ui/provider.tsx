'use client';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ReactNode, JSX } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export function Provider({ children }: ProviderProps): JSX.Element {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
