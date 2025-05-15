import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import type { JSX, ReactNode } from 'react';

interface NavButtonLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  display?: string | object;
  _hover?: { color: string };
}

const NavButtonLink = ({ to, children, onClick, display, _hover }: NavButtonLinkProps): JSX.Element => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant='ghost'
          fontSize='14px'
          fontWeight='400'
          fontFamily="'Inter', sans-serif"
          color={isActive ? 'primary._hover' : 'darkText.default'}
          height='auto'
          p={0}
          m={0}
          _hover={{
            color: _hover?.color || 'primary._hover',
            backgroundColor: 'transparent',
          }}
          _focus={{ boxShadow: 'none' }}
          _active={{ backgroundColor: 'transparent' }}
          textAlign='center'
          onClick={onClick}
          display={display}
        >
          {children}
        </Button>
      )}
    </NavLink>
  );
};

export default NavButtonLink;
