import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import NavButtonLink from './NavButtonLink';
import { getAnonymousToken } from '@/services/AuthService/AuthService';
import { isUserData } from '@/utils/validateUserData';

interface AuthNavLinksProps {
  onLinkClick?: () => void;
}

const USER_DATA_KEY = 'userData';

const AuthNavLinks = ({ onLinkClick }: AuthNavLinksProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(USER_DATA_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isUserData(parsed)) {
          setIsAuthenticated(parsed.isLoggedIn);
        }
      } catch {
        console.warn('Invalid userData in localStorage');
      }
    }
  }, []);

  const handleLogout = async (): Promise<void> => {
    try {
      const anonToken = await getAnonymousToken();
      if (anonToken?.access_token) {
        const anonUserData = {
          token: anonToken.access_token,
          isLoggedIn: false,
        };
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(anonUserData));
        setIsAuthenticated(false);
        void navigate('/');
      }
    } catch (error) {
      console.error('Failed to fetch anonymous token:', error);
    }
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
