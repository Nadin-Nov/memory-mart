import { Grid, Box, Button, Heading } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import type { ReactElement } from 'react';

const links = [
  { path: '/', label: 'Home' },
  { path: '/catalog', label: 'Catalog' },
  { path: '/about-us', label: 'About Us' },
  { path: '/login', label: 'Login' },
  { path: '/registration', label: 'Registration' },
  { path: '/profile', label: 'Profile' },
  { path: '/cart', label: 'Cart' },
];

const MainPage = (): ReactElement => {
  return (
    <Box maxW='960px' mx='auto' p='20px'>
      <Heading as='h2' size='lg' mb='20px' textAlign='center' fontFamily='heading' color='darkText.default'>
        Dashboard Links
      </Heading>
      <Grid templateColumns='repeat(auto-fit, minmax(120px, 1fr))' gap='15px'>
        {links.map((link) => (
          <NavLink key={link.path} to={link.path}>
            <Button
              width='100%'
              height='35px'
              fontSize='lg'
              fontWeight='500'
              bg='primary.solid'
              color='primary.contrast'
              _hover={{ bg: 'primary._hover', color: 'lightText.default' }}
              variant='solid'
            >
              {link.label}
            </Button>
          </NavLink>
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
