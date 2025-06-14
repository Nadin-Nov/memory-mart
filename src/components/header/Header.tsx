import { Flex, Box, Grid, Button, useMediaQuery } from '@chakra-ui/react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscMenu } from 'react-icons/vsc';
import NavMenu from './NavMenu';
import Logo from './Logo';
import NavButtonLink from './NavButtonLink';
import { useState, useContext, useEffect } from 'react';
import type { JSX } from 'react';
import { iconSizes, hoverStyles, layoutStyles } from '@/theme/theme';
import { AuthContext } from '@/context/AuthContext';

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop] = useMediaQuery(['(min-width: 900px)']);

  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isDesktop, isMobileMenuOpen]);

  const onToggle = (): void => setIsMobileMenuOpen((previous) => !previous);

  const handleLinkClick = (): void => {
    setIsMobileMenuOpen(false);
  };

  const auth = useContext(AuthContext);
  const cartCount = auth?.cartItemCount ?? 0;

  return (
    <Box as='header' {...layoutStyles.header}>
      <Grid {...layoutStyles.grid}>
        <NavButtonLink to='/' disableActiveState onClick={handleLinkClick}>
          <Box transition='color 0.2s'>
            <Logo />
          </Box>
        </NavButtonLink>

        {isDesktop && (
          <Box>
            <NavMenu onLinkClick={handleLinkClick} />
          </Box>
        )}

        <Flex justify='flex-end' align='center' gap={2.5} position='relative'>
          <NavButtonLink to='/cart' {...hoverStyles.linkHover} onClick={handleLinkClick} position='relative'>
            <Box width={`${iconSizes.headerIcon}px`} height={`${iconSizes.headerIcon}px`} position='relative'>
              <CiShoppingCart style={{ width: '100%', height: '100%' }} color='inherit' />
              {cartCount > 0 && (
                <Box
                  position='absolute'
                  top='-5px'
                  right='-5px'
                  bg='teal.600'
                  color='white'
                  borderRadius='50%'
                  fontSize='xs'
                  fontWeight='bold'
                  width='18px'
                  height='18px'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                  pointerEvents='none'
                >
                  {cartCount}
                </Box>
              )}
            </Box>
          </NavButtonLink>

          {!isDesktop && (
            <Box alignItems='center'>
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
          )}
        </Flex>
      </Grid>

      {isMobileMenuOpen && !isDesktop && (
        <Box {...layoutStyles.mobileMenu}>
          <NavMenu onLinkClick={handleLinkClick} />
        </Box>
      )}
    </Box>
  );
};

export default Header;
