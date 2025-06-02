import type { Attribute } from '@/types/product';
import type { JSX } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

interface ProductAttributesProps {
  attributes: Attribute[];
}

const allowedAttributes = new Set(['Mood', 'Size', 'popularity', 'new-arrival']);
const highlightOnlyValue = new Set(['popularity', 'new-arrival']);

const ProductAttributes = ({ attributes }: ProductAttributesProps): JSX.Element => {
  const filteredAttributes = attributes.filter((attribute) => allowedAttributes.has(attribute.name));

  return (
    <Box as='aside' flex='1 1 0' p='4' maxWidth='500px' minWidth='0'>
      <Heading as='h3' size='sm' mb='2' color='darkText.default' />
      <Box>
        {filteredAttributes.map(({ name, value }) => {
          const value_ = typeof value === 'string' ? value : value.label || value.key || JSON.stringify(value);

          return (
            <Box key={name} mb='2'>
              {highlightOnlyValue.has(name) ? (
                <Text
                  as='span'
                  fontWeight='extrabold'
                  color='lightText.default'
                  fontStyle='italic'
                  textTransform='uppercase'
                  letterSpacing='wide'
                  bg='teal.600'
                  px={2}
                  py={1}
                  borderRadius='md'
                  display='inline-block'
                  boxShadow='md'
                  mt={3}
                >
                  {value_}
                </Text>
              ) : (
                <Text color='darkText.subtle'>
                  <Text as='span' fontWeight='bold' color='#A18A68' mr='1'>
                    {name}:
                  </Text>
                  {value_}
                </Text>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductAttributes;
