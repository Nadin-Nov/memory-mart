import { Flex } from '@chakra-ui/react';
import NavButtonLink from './NavButtonLink';
import AuthNavLinks from './AuthNavLinks';
import type { JSX } from 'react';
import { navMenuStyles } from '../../theme/theme';
import { navLinks } from '@/utils/navLinks';

interface NavMenuProps {
  onLinkClick?: () => void;
}

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
