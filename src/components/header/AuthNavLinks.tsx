import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButtonLink from './NavButtonLink';
import { getAnonymousToken } from '@/services/AuthService/AuthService';

interface AuthNavLinksProps {
  onLinkClick?: () => void;
}

const AuthNavLinks = ({ onLinkClick }: AuthNavLinksProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsAuthenticated(loggedIn);
  }, []);

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('customer_token');
    localStorage.setItem('isLoggedIn', 'false');

    const anonToken = await getAnonymousToken();
    if (anonToken?.access_token) {
      localStorage.setItem('access_token', anonToken.access_token);
    }

    setIsAuthenticated(false);
    void navigate('/');
  };

  const performLogout = async (): Promise<void> => {
    await handleLogout();
    onLinkClick?.();
  };

  const onLogoutClick = (): void => {
    void performLogout();
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
