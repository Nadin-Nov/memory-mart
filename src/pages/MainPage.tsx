import { Grid, Box, Heading } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';

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
      <Grid templateColumns='repeat(auto-fit, minmax(140px, 1fr))' gap='20px'>
        {links.map((link) => (
          <PrimaryButton key={link.path} title={link.label} link={link.path} />
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
