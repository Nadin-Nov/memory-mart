import { Button } from '@chakra-ui/react';
import type { JSX } from 'react';
import NavButtonLink from './NavButtonLink';
import { useAuth } from '@/context/useAuth';

interface AuthNavLinksProps {
  onLinkClick?: () => void;
}

const AuthNavLinks = ({ onLinkClick }: AuthNavLinksProps): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();

  const onLogoutClick = (): void => {
    void logout().then(() => {
      onLinkClick?.();
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavButtonLink to='/profile' onClick={onLinkClick}>
            Profile
          </NavButtonLink>
          <Button
            variant='ghost'
            fontSize='14px'
            fontWeight='400'
            fontFamily='body'
            onClick={onLogoutClick}
            cursor='pointer'
            _hover={{ color: 'link.hover', backgroundColor: 'transparent' }}
            _focus={{ boxShadow: 'none' }}
            p={0}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <NavButtonLink to='/login' onClick={onLinkClick}>
            Login
          </NavButtonLink>
          <NavButtonLink to='/registration' onClick={onLinkClick}>
            Registration
          </NavButtonLink>
        </>
      )}
    </>
  );
};

export default AuthNavLinks;
