import type { Image } from '@/types/product';
import type { JSX } from 'react';
import { Box, Image as ChakraImage, Text } from '@chakra-ui/react';

interface ProductImageProps {
  image?: Image;
}

const ProductImage = ({ image }: ProductImageProps): JSX.Element => {
  if (!image) {
    return (
      <Box flex='1 1 0' p='4' bg='lightBeige.500'>
        <Text color='darkText.subtle'>No image available</Text>
      </Box>
    );
  }

  return (
    <Box flex='1 1 0' p='4' bg='lightBeige.500'>
      <ChakraImage
        src={image.url}
        alt={image.label || 'Product Image'}
        maxW='100%'
        height='auto'
        borderRadius='md'
        boxShadow='md'
      />
    </Box>
  );
};

export default ProductImage;
