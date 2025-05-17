import { Flex } from '@chakra-ui/react';
import NavButtonLink from './NavButtonLink';
import AuthNavLinks from './AuthNavLinks';
import type { JSX } from 'react';
import { navMenuStyles } from '../../theme/theme';

interface NavMenuProps {
  onLinkClick?: () => void;
}

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/catalog', label: 'Catalog' },
  { path: '/about-us', label: 'About Us' },
];

const NavMenu = ({ onLinkClick }: NavMenuProps): JSX.Element => {
  return (
    <Flex {...navMenuStyles.container} as='nav'>
      {navLinks.map((link) => (
        <NavButtonLink key={link.path} to={link.path} onClick={onLinkClick}>
          {link.label}
        </NavButtonLink>
      ))}

      <AuthNavLinks onLinkClick={onLinkClick} />
    </Flex>
  );
};

export default NavMenu;
