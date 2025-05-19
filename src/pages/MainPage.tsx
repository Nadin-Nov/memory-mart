import { Grid, Box, Heading } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { navLinksMain } from '@/utils/navLinks';
import { useNavigate } from 'react-router-dom';

const MainPage = (): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = (path: string): ((event: React.FormEvent) => void) => {
    return (event: React.FormEvent) => {
      event.preventDefault();
      void navigate(path);
    };
  };

  return (
    <Box maxW='960px' mx='auto' p='20px'>
      <Heading as='h2' size='lg' mb='20px' textAlign='center' fontFamily='heading' color='darkText.default'>
        Dashboard Links
      </Heading>
      <Grid templateColumns='repeat(auto-fit, minmax(140px, 1fr))' gap='20px'>
        {navLinksMain.map((link) => (
          <PrimaryButton key={link.path} title={link.label} onClick={handleNavigate(link.path)} />
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
