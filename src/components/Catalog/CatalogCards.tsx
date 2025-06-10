import type { Product } from '@/types/product';
import { Grid, Text } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import CatalogCard from './CatalogCard';

interface CatalogCardsProps {
  products: Product[];
}

export default function CatalogCards({ products }: CatalogCardsProps): ReactElement {
  if (products.length === 0) {
    return <Text mt={4}>No products found.</Text>;
  }

  return (
    <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8} py={6}>
      {products.map((product) => (
        <CatalogCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
