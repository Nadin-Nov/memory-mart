import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButtonLink from './NavButtonLink';
import { useAuth } from '@/context/useAuth';

interface AuthNavLinksProps {
  onLinkClick?: () => void;
}

const AuthNavLinks = ({ onLinkClick }: AuthNavLinksProps): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const onLogoutClick = (): void => {
    void logout().then(() => {
      onLinkClick?.();
      void navigate('/');
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavButtonLink to='/profile' onClick={onLinkClick}>
            Profile
          </NavButtonLink>
          <NavButtonLink to='/login' onClick={onLogoutClick}>
            Logout
          </NavButtonLink>
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
