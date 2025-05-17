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

const NavButtonLink = ({ to, children, onClick, display }: NavButtonLinkProps): JSX.Element => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Button
          variant='ghost'
          fontSize='14px'
          fontWeight='400'
          fontFamily='body'
          color={isActive ? 'link.active' : 'link.default'}
          height='auto'
          p={0}
          m={0}
          _hover={{
            color: 'link.hover',
            backgroundColor: 'transparent',
          }}
          _focus={{ boxShadow: 'none' }}
          _active={{ backgroundColor: 'transparent', color: 'link.active' }}
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
