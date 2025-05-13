import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import type { JSX, ReactNode } from 'react';

interface NavButtonLinkProps {
  to: string;
  children: ReactNode;
  onClick?: () => void;
  display?: string | object;
  _hover?: { color: string }; // только color
}

const NavButtonLink = ({ to, children, onClick, display, _hover }: NavButtonLinkProps): JSX.Element => {
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
        _hover={{
          color: _hover?.color || 'primary._hover', // меняем только цвет текста
          backgroundColor: 'transparent', // фон остаётся прозрачным
        }}
        _focus={{ boxShadow: 'none' }}
        _active={{ backgroundColor: 'transparent' }} // фон остаётся прозрачным
        textAlign='center'
        onClick={onClick}
        display={display}
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavButtonLink;
