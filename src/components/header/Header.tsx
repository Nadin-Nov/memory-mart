import { Flex, Box, Grid, Button } from '@chakra-ui/react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import NavMenu from './NavMenu';
import Logo from './Logo';
import type { JSX } from 'react';
import { useState } from 'react';

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
        <Logo />

        <Box display={{ base: 'none', md: 'block' }}>
          <NavMenu />
        </Box>

        <Flex justify='flex-end' align='center' gap='10px'>
          <Button variant='ghost' aria-label='Shopping Cart' display={{ base: 'flex', md: 'none' }} mr='5px'>
            <FaShoppingCart size={24} color='#3196a5' />
          </Button>

          <Box display={{ base: 'flex', md: 'none' }} alignItems='center'>
            <Button variant='ghost' onClick={onToggle} aria-label='Toggle menu'>
              <FaBars size={24} color='#3196a5' />
            </Button>
          </Box>

          <Button variant='ghost' aria-label='Shopping Cart' display={{ base: 'none', md: 'flex' }}>
            <FaShoppingCart size={24} color='#3196a5' />
          </Button>
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
