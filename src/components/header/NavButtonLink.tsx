import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import type { JSX, ReactNode } from 'react';

interface NavButtonLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
}

const NavButtonLink = ({ to, children, onClick }: NavButtonLinkProps): JSX.Element => {
  return (
    <Link to={to}>
      <Button
        variant='ghost'
        fontSize='14px'
        fontWeight='400'
        fontFamily="'Inter', sans-serif"
        color='primary.solid'
        height='auto'
        p={0}
        _hover={{ color: 'primary._hover', backgroundColor: 'transparent' }}
        _focus={{ boxShadow: 'none' }}
        _active={{ backgroundColor: 'transparent' }}
        textAlign='center'
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavButtonLink;
