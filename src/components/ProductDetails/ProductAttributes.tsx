import type { Attribute } from '@/types/product';
import type { JSX } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface ProductAttributesProps {
  attributes: Attribute[];
}

const ProductAttributes = ({ attributes }: ProductAttributesProps): JSX.Element => {
  return (
    <Box as='aside' width='200px' p='4'>
      <Heading as='h3' size='sm' mb='2' color='darkText.default'>
        Attributes
      </Heading>
      <Box as='ul' listStyleType='disc' pl='4' m='0'>
        {attributes.map(({ name, value }) => (
          <Box as='li' key={name} color='darkText.subtle' mb='2'>
            <Text as='span' fontWeight='bold' color='darkText.default'>
              {name}:
            </Text>{' '}
            {typeof value === 'string' ? value : value.label || value.key || JSON.stringify(value)}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductAttributes;
