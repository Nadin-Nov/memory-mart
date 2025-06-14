import { Button } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import type { JSX, ReactNode } from 'react';

interface NavButtonLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  display?: string | object;
  _hover?: { color: string };
  disableActiveState?: boolean;
  position?: string;
}

const NavButtonLink = ({
  to,
  children,
  onClick,
  display,
  disableActiveState = false,
  position,
}: NavButtonLinkProps): JSX.Element => {
  return (
    <NavLink to={to}>
      {({ isActive }) => {
        const active = disableActiveState ? false : isActive;

        return (
          <Button
            variant='ghost'
            fontSize='14px'
            fontWeight='400'
            fontFamily='body'
            color={active ? 'primary.solid' : 'link.default'}
            height='auto'
            p={0}
            m={0}
            disabled={active}
            cursor={active ? 'default' : 'pointer'}
            _hover={{
              color: active ? 'link.active' : 'link.hover',
              backgroundColor: 'transparent',
              cursor: active ? 'default' : 'pointer',
            }}
            _focus={{ boxShadow: 'none' }}
            _active={{ backgroundColor: 'transparent', color: 'link.active' }}
            textAlign='center'
            onClick={onClick}
            display={display}
            position={position}
          >
            {children}
          </Button>
        );
      }}
    </NavLink>
  );
};

export default NavButtonLink;
