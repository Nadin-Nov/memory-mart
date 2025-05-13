import { Box, Text, Image } from '@chakra-ui/react';
import logoImage from '@/assets/memory-mart_logo.webp';
import type { JSX } from 'react';

const SPARKLE_SIZE = '2px';
const SPARKLE_COLOR = 'primary._hover';
const SPARKLE_POSITION_RANGE = 100;

const sparkles = Array.from({ length: 20 }).map(() => ({
  left: `${Math.random() * SPARKLE_POSITION_RANGE}%`,
  top: `${Math.random() * SPARKLE_POSITION_RANGE}%`,
}));

const Logo = (): JSX.Element => {
  return (
    <Box
      position='relative'
      display='flex'
      alignItems='center'
      whiteSpace='nowrap'
      cursor='pointer'
      role='button'
      className='group' // Добавили группу для ховера
    >
      {sparkles.map((pos, index) => (
        <Box
          key={index}
          className='sparkle'
          position='absolute'
          width={SPARKLE_SIZE}
          height={SPARKLE_SIZE}
          bg={SPARKLE_COLOR}
          borderRadius='50%'
          opacity={0}
          left={pos.left}
          top={pos.top}
          transition='opacity 0.2s ease'
          _groupHover={{ opacity: 1 }} // Появляется при ховере на родителя
        />
      ))}

      <Image
        src={logoImage}
        alt='Logo'
        boxSize={{ base: '40px', md: '40px', lg: '40px' }}
        mr={3}
        transition='opacity 0.2s ease'
        _groupHover={{ opacity: 0.8 }} // Слушаем hover на группе
      />

      <Text
        fontFamily='heading'
        fontWeight='400'
        fontSize={{ base: '24px', md: '28px', lg: '32px' }}
        lineHeight='1'
        color='primary.solid'
        transition='color 0.2s ease'
        _groupHover={{ color: 'primary._hover' }} // Меняем цвет текста при ховере на группе
      >
        Memory Shop
      </Text>
    </Box>
  );
};

export default Logo;
