import { Grid, Box, Heading } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { PrimarySpaButton } from '@/components/PrimaryButton/PrimarySpaButton';
import { navLinksMain } from '@/utils/navLinks';

const MainPage = (): ReactElement => {
  return (
    <Box maxW='960px' mx='auto' p='20px'>
      <Heading as='h2' size='lg' mb='20px' textAlign='center' fontFamily='heading' color='darkText.default'>
        Dashboard Links
      </Heading>
      <Grid templateColumns='repeat(auto-fit, minmax(140px, 1fr))' gap='20px'>
        {navLinksMain.map((link) => (
          <PrimarySpaButton key={link.path} title={link.label} link={link.path} />
        ))}
      </Grid>
    </Box>
  );
};

export default MainPage;
