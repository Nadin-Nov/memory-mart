import { Box, Heading, Text, Image } from '@chakra-ui/react';
import type { ReactElement } from 'react';

const MainPage = (): ReactElement => {
  return (
    <Box width='100%' display='flex' flexDirection='column' alignItems='center'>
      <Box width='100%' maxW='1440px' height={['300px', '300px', '450px']} position='relative' overflow='hidden'>
        <Image
          src='/assets/bg14.png'
          alt='Main background'
          width='100%'
          height='100%'
          objectFit='cover'
          objectPosition={['center center', 'center center', 'center bottom']}
          position='absolute'
          top='0'
          left='0'
          zIndex={0}
        />

        <Box position='relative' zIndex={1} px={['20px', '40px']} pt={['120px', '130px', '160px']} textAlign='left'>
          <Text
            fontWeight='400'
            fontSize={['16px', '18px', '20px']}
            lineHeight='40px'
            letterSpacing='4%'
            color='lightText.default'
            mb='4'
            fontFamily='heading'
          >
            welcome to the memory shop
          </Text>

          <Heading
            as='h1'
            color='lightText.default'
            maxW='90%'
            fontFamily='heading'
            fontWeight='500'
            letterSpacing='4%'
            lineHeight='40px'
            fontSize={['24px', '28px', '32px', '40px']}
          >
            dreamy relics from the heart’s attic
          </Heading>
        </Box>
      </Box>

      <Box
        width='100%'
        maxW='1440px'
        display='flex'
        justifyContent='flex-start'
        px={['20px', '40px']}
        lineHeight='0'
        m='0'
        p='0'
        background='none'
      >
        <Box
          width={['100%', '80%', '80%', '80%', '40%']} // base, mobile, smallTablet, tablet, desktop+
          maxW={['100%', '600px', '600px', '600px', '600px']}
          lineHeight='0'
          mx={['auto', 'auto', 'auto', 'auto', '0']} // центрируем до desktop, слева на desktop+
        >
          <Image src='/assets/promo.png' alt='Promo Codes' width='100%' height='auto' display='block' m='0' p='0' />
        </Box>
      </Box>

      {/* //todo: insert product cards here */}

      <Box maxW='900px' px={['20px', '40px']} mt='80px' mb='100px' textAlign='center'>
        <Heading
          fontSize={['36px', '32px', '28px', '24px']}
          fontWeight='500'
          mb='6'
          color='gray.700'
          fontFamily='heading'
        >
          Memory Shop — a place between dreams and dusty drawers.
        </Heading>
        <Text fontSize={['18px', '20px']} color='darkText.subtle' lineHeight='1.7' mb='4' fontFamily='body'>
          Where every keepsake tells a story, and every story feels like home.
        </Text>
        <Text fontSize={['18px', '20px']} color='darkText.subtle' lineHeight='1.7' mb='4' fontFamily='body'>
          Step inside and discover treasures that whisper memories and dreams alike.
        </Text>
        <Text fontSize={['18px', '20px']} color='darkText.subtle' lineHeight='1.7' fontFamily='body'>
          Every item holds a story. Find your next treasure and keep the magic alive.
        </Text>
      </Box>
    </Box>
  );
};

export default MainPage;
