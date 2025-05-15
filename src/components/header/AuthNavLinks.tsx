import NavButtonLink from './NavButtonLink';
import { useState, type JSX } from 'react';

interface AuthNavLinksProps {
  onLinkClick?: () => void;
}

const AuthNavLinks = ({ onLinkClick }: AuthNavLinksProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavButtonLink to='/profile' onClick={onLinkClick}>
            Profile
          </NavButtonLink>
          <NavButtonLink
            to='/logout'
            onClick={() => {
              handleLogout();
              onLinkClick?.();
            }}
          >
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
