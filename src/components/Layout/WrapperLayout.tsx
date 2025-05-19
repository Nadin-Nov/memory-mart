import { Container } from '@chakra-ui/react';
import type { ReactNode, ReactElement } from 'react';

interface WrapperLayoutProps {
  children: ReactNode;
}

const WrapperLayout = ({ children }: WrapperLayoutProps): ReactElement => {
  return (
    <Container maxW='1440px' px={{ base: '16px', md: '24px' }} mx='auto' mt='20px' mb='20px'>
      {children}
    </Container>
  );
};

export default WrapperLayout;
