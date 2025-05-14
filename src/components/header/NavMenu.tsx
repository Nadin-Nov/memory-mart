import { Flex } from '@chakra-ui/react';
import NavButtonLink from './NavButtonLink';
import AuthNavLinks from './AuthNavLinks';
import type { JSX } from 'react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/catalog', label: 'Catalog' },
  { path: '/about-us', label: 'About Us' },
];

const NavMenu = (): JSX.Element => {
  return (
    <Flex
      as='nav'
      justify='center'
      align='center'
      gap='20px'
      maxW='100%'
      flexWrap='wrap'
      direction={{ base: 'column', md: 'row' }}
    >
      {navLinks.map((link) => (
        <NavButtonLink key={link.path} to={link.path}>
          {link.label}
        </NavButtonLink>
      ))}

      <AuthNavLinks />
    </Flex>
  );
};

export default NavMenu;
