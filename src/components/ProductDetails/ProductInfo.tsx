import type { MasterVariant, PriceValue } from '@/types/product';
import type { JSX } from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/react';

interface ProductInfoProps {
  name: string;
  description: string;
  masterVariant: MasterVariant;
}

const cents = 100;
const decimals = 2;

const formatPriceValue = (priceValue: PriceValue): string => {
  return (priceValue.centAmount / cents).toFixed(decimals);
};

const ProductInfo = ({ name, description, masterVariant }: ProductInfoProps): JSX.Element => {
  const price = masterVariant.prices[0];
  const discountedPrice = price?.discounted;

  return (
    <Box flex='1 1 0' p='4' maxWidth='500px'>
      <Heading as='h1' size='lg' fontWeight='bold' color='darkText.default' mb='2'>
        {name}
      </Heading>

      <Text color='darkText.subtle' mb='4'>
        {description}
      </Text>

      {price && (
        <Text fontSize='lg' mb='4' color='#A18A68'>
          {discountedPrice ? (
            <>
              <Text as='span' textDecoration='line-through' color='gray.500' mr='2'>
                ${formatPriceValue(price.value)}
              </Text>
              <Text as='span' fontWeight='bold' color='teal.600'>
                ${formatPriceValue(discountedPrice.value)}
              </Text>
            </>
          ) : (
            <Text as='span'>${formatPriceValue(price.value)}</Text>
          )}
        </Text>
      )}

      <Button
        mt='4'
        size='md'
        variant='outline'
        color='primary.solid'
        borderColor='primary.solid'
        _hover={{ bg: 'transparent', color: 'primary._hover', borderColor: 'primary._hover' }}
      >
        Buy
      </Button>
    </Box>
  );
};

export default ProductInfo;
