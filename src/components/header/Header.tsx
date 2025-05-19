import { Flex, Box, Grid, Button, useBreakpointValue } from '@chakra-ui/react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscMenu } from 'react-icons/vsc';
import NavMenu from './NavMenu';
import Logo from './Logo';
import NavButtonLink from './NavButtonLink';
import { useState, useEffect } from 'react';
import type { JSX } from 'react';
import { iconSizes, hoverStyles, layoutStyles } from '@/theme/theme';

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const onToggle = (): void => setIsMobileMenuOpen((previous) => !previous);

  useEffect(() => {
    if (isDesktop) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop]);

  const handleLinkClick = (): void => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Box as='header' {...layoutStyles.header}>
      <Grid {...layoutStyles.grid}>
        <NavButtonLink to='/' {...hoverStyles.linkHover} onClick={handleLinkClick}>
          <Box transition='color 0.2s'>
            <Logo />
          </Box>
        </NavButtonLink>

        <Box display={{ base: 'none', md: 'block' }}>
          <NavMenu onLinkClick={handleLinkClick} />
        </Box>

        <Flex justify='flex-end' align='center' gap={2.5}>
          <NavButtonLink
            to='/cart'
            display={{ base: 'flex', md: 'none' }}
            {...hoverStyles.linkHover}
            onClick={handleLinkClick}
          >
            <Box width={`${iconSizes.headerIcon}px`} height={`${iconSizes.headerIcon}px`}>
              <CiShoppingCart style={{ width: '100%', height: '100%' }} color='inherit' />
            </Box>
          </NavButtonLink>

          <Box display={{ base: 'flex', md: 'none' }} alignItems='center'>
            <Button
              variant='ghost'
              onClick={onToggle}
              aria-label='Toggle menu'
              {...hoverStyles.buttonHover}
              color='inherit'
              transition='transform 0.3s ease'
              transform={isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
            >
              <Box width={`${iconSizes.headerIcon}px`} height={`${iconSizes.headerIcon}px`}>
                <VscMenu style={{ width: '100%', height: '100%' }} color='inherit' />
              </Box>
            </Button>
          </Box>

          <NavButtonLink
            to='/cart'
            display={{ base: 'none', md: 'flex' }}
            {...hoverStyles.linkHover}
            onClick={handleLinkClick}
          >
            <Box width={`${iconSizes.headerIcon}px`} height={`${iconSizes.headerIcon}px`}>
              <CiShoppingCart style={{ width: '100%', height: '100%' }} color='inherit' />
            </Box>
          </NavButtonLink>
        </Flex>
      </Grid>

      {isMobileMenuOpen && (
        <Box {...layoutStyles.mobileMenu}>
          <NavMenu onLinkClick={handleLinkClick} />
        </Box>
      )}
    </Box>
  );
};

export default Header;
