import { Flex, Box, Grid, Button } from '@chakra-ui/react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
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
        {/* Логотип */}
        <NavButtonLink to='/' _hover={{ color: 'primary._hover' }}>
          <Box transition='color 0.2s'>
            <Logo />
          </Box>
        </NavButtonLink>

        {/* Навигация для десктопа */}
        <Box display={{ base: 'none', md: 'block' }}>
          <NavMenu />
        </Box>

        <Flex justify='flex-end' align='center' gap='10px'>
          {/* Корзина для мобильной версии */}
          <NavButtonLink to='/cart' display={{ base: 'flex', md: 'none' }} _hover={{ color: 'primary._hover' }}>
            <FaShoppingCart size={24} color='inherit' /> {/* color: inherit чтобы использовать родительский цвет */}
          </NavButtonLink>

          {/* Бургер-меню для мобильных устройств */}
          <Box display={{ base: 'flex', md: 'none' }} alignItems='center'>
            <Button
              variant='ghost'
              onClick={onToggle}
              aria-label='Toggle menu'
              _hover={{
                backgroundColor: 'transparent', // Убираем фон
                color: 'primary._hover', // Меняем цвет иконки при ховере
              }}
              _active={{
                backgroundColor: 'transparent', // Убираем фон при клике
                color: 'primary._hover', // Меняем цвет при активном состоянии
              }}
              color='primary.solid' // начальный цвет иконки
            >
              <FaBars size={24} color='inherit' /> {/* Используем inherit для наследования цвета от кнопки */}
            </Button>
          </Box>

          {/* Корзина для десктопной версии */}
          <NavButtonLink to='/cart' display={{ base: 'none', md: 'flex' }} _hover={{ color: 'primary._hover' }}>
            <FaShoppingCart size={24} color='inherit' />
          </NavButtonLink>
        </Flex>
      </Grid>

      {/* Мобильное меню */}
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
