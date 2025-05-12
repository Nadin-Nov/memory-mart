import NavButtonLink from './NavButtonLink';
import type { JSX } from 'react';
import { useState } from 'react';

const AuthNavLinks = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavButtonLink to='/profile'>Profile</NavButtonLink>
          <NavButtonLink to='/logout' onClick={handleLogout}>
            Logout
          </NavButtonLink>
        </>
      ) : (
        <>
          <NavButtonLink to='/login'>Login</NavButtonLink>
          <NavButtonLink to='/registration'>Registration</NavButtonLink>
        </>
      )}
    </>
  );
};

export default AuthNavLinks;
