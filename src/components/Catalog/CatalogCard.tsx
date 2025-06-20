import type { Product } from '@/types/product';
import { Box, Flex, Heading, Image, LinkBox, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import CartActionButton from '../CartActionButton/CartActionButton';

interface CatalogCardProps {
  product: Product;
}

const cents = 100;
const symb = 2;

export default function CatalogCard({ product }: CatalogCardProps): ReactElement {
  const name = product.name['en-US'] ?? 'Unnamed';
  const description = product.description?.['en-US'] ?? '';
  const key = product.key;
  const imageUrl = product.masterVariant?.images?.[0]?.url;
  const priceCents = product.masterVariant?.prices?.[0]?.value?.centAmount ?? 0;
  const priceDollars = (priceCents / cents).toFixed(symb);

  const navigate = useNavigate();

  return (
    <LinkBox
      key={product.id}
      bgColor='lightBeige.500'
      borderRadius='md'
      boxShadow='md'
      p={4}
      cursor='pointer'
      transition='all 0.2s'
      _hover={{ transform: 'scale(1.02)', boxShadow: 'lg' }}
      onClick={() => {
        navigate(`/product-detail/${key}`);
      }}
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      h='100%'
    >
      <Box w='100%'>
        {imageUrl && (
          <Box w='100%' h='220px' p={2} mb={4} boxShadow='base' border='1px solid' borderColor='gray.200'>
            <Image loading='lazy' src={imageUrl} alt={name} objectFit='cover' h='100%' w='100%' />
          </Box>
        )}
        <Heading as='h3' size='xs' textAlign='center' mb={2} lineHeight={'2rem'}>
          {name}
        </Heading>
        <Text fontSize='xs' textAlign='center' color='gray.500' maxLines={2} mb={2}>
          {description}
        </Text>
        <Box textAlign='center' mb={2}>
          {product.masterVariant?.prices?.[0]?.discounted ? (
            <Flex direction='column'>
              <Text fontWeight='bold' color='teal.600' fontSize='sm'>
                ${(product.masterVariant.prices[0].discounted.value.centAmount / cents).toFixed(symb)}
              </Text>
              <Text as='s' color='gray.500' fontSize='sm'>
                ${(product.masterVariant.prices[0].value.centAmount / cents).toFixed(symb)}
              </Text>
            </Flex>
          ) : (
            <Text fontWeight='bold' color='teal.600' fontSize='sm'>
              ${priceDollars}
            </Text>
          )}
        </Box>
      </Box>
      <Box mt='auto' onClick={(event) => event.stopPropagation()}>
        <CartActionButton product={product} />
      </Box>
    </LinkBox>
  );
}
