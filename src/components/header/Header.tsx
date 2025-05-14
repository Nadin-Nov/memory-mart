import { Flex, Box, Grid, Button } from '@chakra-ui/react';
import { CiShoppingCart } from 'react-icons/ci';
import { VscMenu } from 'react-icons/vsc';
import NavMenu from './NavMenu';
import Logo from './Logo';
import NavButtonLink from './NavButtonLink';
import { useState } from 'react';
import type { JSX } from 'react';

const Header = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const onToggle = (): void => setIsMobileMenuOpen((previous) => !previous);

  return (
    <Box as='header' bg='beige.500' p='10px' zIndex={10}>
      <Grid
        templateColumns={{ base: '1fr 1fr', md: '1fr 3fr 1fr' }}
        alignItems='center'
        w='100%'
        maxW='1440px'
        margin='0 auto'
      >
        <NavButtonLink to='/' _hover={{ color: 'primary._hover' }}>
          <Box transition='color 0.2s'>
            <Logo />
          </Box>
        </NavButtonLink>

        <Box display={{ base: 'none', md: 'block' }}>
          <NavMenu />
        </Box>

        <Flex justify='flex-end' align='center' gap='10px'>
          {/* Корзина для мобильной версии */}
          <NavButtonLink to='/cart' display={{ base: 'flex', md: 'none' }} _hover={{ color: 'primary._hover' }}>
            <CiShoppingCart size={40} color='inherit' />
          </NavButtonLink>

          <Box display={{ base: 'flex', md: 'none' }} alignItems='center'>
            <Button
              variant='ghost'
              onClick={onToggle}
              aria-label='Toggle menu'
              _hover={{
                backgroundColor: 'transparent',
                color: 'primary._hover',
              }}
              _active={{
                backgroundColor: 'transparent',
                color: 'primary._hover',
              }}
              color='inherit'
              transition='transform 0.3s ease'
              transform={isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
            >
              <VscMenu size={40} color='inherit' />
            </Button>
          </Box>

          <NavButtonLink to='/cart' display={{ base: 'none', md: 'flex' }} _hover={{ color: 'primary._hover' }}>
            <CiShoppingCart size={40} color='inherit' style={{ margin: 0, padding: 0 }} />
          </NavButtonLink>
        </Flex>
      </Grid>

      {isMobileMenuOpen && (
        <Box
          position='absolute'
          top='70px'
          left='0'
          width='100%'
          bg='primary.contrast'
          zIndex={3}
          display='flex'
          flexDirection='column'
          alignItems='center'
          gap='10px'
          p='20px'
        >
          <NavMenu />
        </Box>
      )}
    </Box>
  );
};

export default Header;
