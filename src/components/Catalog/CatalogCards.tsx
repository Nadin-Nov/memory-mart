import type { Product } from '@/types/product';
import { Box, Grid, Heading, Image, LinkBox, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

interface CatalogCardsProps {
  products: Product[];
}

const cents = 100;
const symb = 2;

export default function CatalogCards({ products }: CatalogCardsProps): ReactElement {
  const navigate = useNavigate();

  if (products.length === 0) {
    return <Text mt={4}>No products found.</Text>;
  }

  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={8} py={6}>
      {products.map((product) => {
        const name = product.name['en-US'] ?? 'Unnamed';
        const description = product.description?.['en-US'] ?? '';
        const key = product.key;
        const imageUrl = product.masterVariant?.images?.[0]?.url;
        const priceCents = product.masterVariant?.prices?.[0]?.value?.centAmount ?? 0;
        const priceDollars = (priceCents / cents).toFixed(symb);

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
            alignItems='center'
          >
            {imageUrl && (
              <Box w='100%' h='220px' p={2} mb={4} boxShadow='base' border='1px solid' borderColor='gray.200'>
                <Image src={imageUrl} alt={name} objectFit='cover' h='100%' w='100%' />
              </Box>
            )}
            <Heading as='h3' size='xs' textAlign='center' mb={2} lineHeight={'2rem'}>
              {name}
            </Heading>
            <Text fontSize='xs' textAlign='center' color='gray.500' maxLines={2} mb={2}>
              {description}
            </Text>
            <Text fontWeight='bold' color='teal.600' fontSize='sm'>
              ${priceDollars}
            </Text>
          </LinkBox>
        );
      })}
    </Grid>
  );
}
