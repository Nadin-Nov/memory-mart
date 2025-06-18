import { Flex, Box, Grid, Button, useMediaQuery } from '@chakra-ui/react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscMenu } from 'react-icons/vsc';
import NavMenu from './NavMenu';
import Logo from './Logo';
import NavButtonLink from './NavButtonLink';
import { useState, useEffect} from 'react';
import type { JSX } from 'react';
import { iconSizes, hoverStyles, layoutStyles } from '@/theme/theme';
import CartBadge from '@/components/Header/CartBadge';
import { useAuth } from '@/context/useAuth';


const Header = (): JSX.Element => {
  const { cartItemCount } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop] = useMediaQuery(['(min-width: 900px)']);

  const onToggle = (): void => setIsMobileMenuOpen((previos) => !previos);

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

        <Flex justify='flex-end' align='center' gap={2.5}>
          <NavButtonLink to='/cart' {...hoverStyles.linkHover} onClick={handleLinkClick}>
            <Box position='relative' width={`${iconSizes.headerIcon}px`} height={`${iconSizes.headerIcon}px`}>
              <CiShoppingCart style={{ width: '100%', height: '100%' }} color='inherit' />
              <CartBadge count={cartItemCount ?? 0} />
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
