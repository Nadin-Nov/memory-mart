import { Box, Heading, Text, Image } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import FlyingGirl from '@/components/MainPage/FlyingGirl';
import PromoCodes from '@/components/MainPage/PromoCodes';
import PromoCodesReminder from '@/components/MainPage/PromoCodesReminder';
import { PrimaryButton } from '@/components/PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router-dom';

const MainPage = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
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

        <PromoCodes />

        <Box maxW='900px' px={['20px', '40px']} mt='80px' textAlign='center'>
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

          <Box mt='140px' mb='10px' display='flex' justifyContent='center' px={['20px', '0']}>
            <Box maxW='300px' width='100%'>
              <PrimaryButton title='let’s go memory hunting' onClick={() => void navigate('/catalog')} />
            </Box>
          </Box>

          {/* Вот здесь вызываем новый компонент */}
          <PromoCodesReminder />

          <Text
            mt='100px'
            fontSize={['14px', '14px', '18px']}
            color='gray.600'
            lineHeight='1.7'
            mb='50px'
            fontFamily='body'
          >
            Every item holds a story. Find your next treasure and keep the magic alive.
          </Text>
        </Box>
      </Box>

      <FlyingGirl />
    </>
  );
};

export default MainPage;
