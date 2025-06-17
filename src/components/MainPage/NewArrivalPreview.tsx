import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import type { Product } from '@/types/product';
import { getFilteredProducts } from '@/services/CommerceService';
import { LocalStorageService } from '@/services/LocalStorageService';
import { isUserData } from '@/utils/validateUserData';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import CatalogCard from '@/components/Catalog/CatalogCard';

const ITEMS_TO_SHOW = 3;
const RANDOM_SORT_FACTOR = 0.5;

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => RANDOM_SORT_FACTOR - Math.random());
  return shuffled.slice(0, count);
}

export default function NewArrivalPreview(): ReactElement | undefined {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = LocalStorageService.getItem('userData', isUserData);
    if (!stored?.token) return;

    const fetchProducts = async (): Promise<void> => {
      try {
        const response = await getFilteredProducts({
          token: stored.token,
          filters: {
            sortBy: 'createdAt desc',
            page: 1,
          },
        });

        const randomProducts = getRandomItems(response.results, ITEMS_TO_SHOW);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return undefined;
  }

  return (
    <Box maxW='1200px' mx='auto' px={4} py={12}>
      <Heading mb={8} textAlign='center' fontSize={['2xl', '3xl', '4xl']} color='teal.700'>
        Today, fate has picked these treasures just for you
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
        {products.map((product) => (
          <CatalogCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
