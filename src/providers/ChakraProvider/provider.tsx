'use client';
import theme from '@/theme/theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { ReactNode, JSX } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export default function ChakraUIProvider({ children }: ProviderProps): JSX.Element {
  return <ChakraProvider value={theme}>{children}</ChakraProvider>;
}
