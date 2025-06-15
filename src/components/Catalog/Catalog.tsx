import { FormProvider, useForm, useWatch } from 'react-hook-form';
import CatalogAside from './CatalogAside';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import type { Product, ProductFilters } from '@/types/product';
import CatalogCards from './CatalogCards';
import type { FilteredProductsResponse } from '@/services/CommerceService';
import { getFilteredProducts } from '@/services/CommerceService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData } from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useDebounce } from 'use-debounce';

const DEBOUNCE_TIME = 400;

const subcategories = [
  { name: 'All', id: '608ac8c4-bd6b-410b-9dcb-ce07e9e186b7' },
  { name: 'Memory & Nostalgia', id: 'ab178765-bfcb-41c2-902e-7a8437802c64' },
  { name: 'Magic & Whimsy', id: 'd14afe83-39b0-4401-a6fa-f71db634caa6' },
  { name: 'Home Comforts', id: 'ae25d3e8-b7e1-4ccf-94d2-5614b3b8b37f' },
];

export default function Catalog(): ReactElement {
  const methods = useForm<ProductFilters>({
    mode: 'onChange',
    defaultValues: {
      category: '608ac8c4-bd6b-410b-9dcb-ce07e9e186b7',
    },
  });
  const filters = useWatch({ control: methods.control });

  const [debouncedFilters] = useDebounce(filters, DEBOUNCE_TIME);
  const [products, setProducts] = useState<Product[]>([]);

  const stored: userData | undefined = LocalStorageService.getItem<userData>('userData', isUserData);

  useEffect((): void => {
    if (!stored?.token) return;

    const fetchProducts = async (): Promise<void> => {
      try {
        const response: FilteredProductsResponse = await getFilteredProducts({
          token: stored.token,
          filters: debouncedFilters,
        });
        setProducts(response.results);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [debouncedFilters, stored?.token]);

  return (
    <FormProvider {...methods}>
      <Flex justify='space-between' align='center' px={4} mb={4} flexWrap='wrap'>
        <Heading size={{ base: 'xs' }} color='darkText.subtle' lineHeight={1.1}>
          Anything seems familiar?
        </Heading>
        <Flex gap={2} mt={{ base: 2, md: 0 }} flexWrap='wrap'>
          {subcategories.map(({ name, id }) => {
            const isActive = filters.category === id;
            return (
              <Button
                key={id}
                size='sm'
                variant={isActive ? 'solid' : 'outline'}
                colorPalette={isActive ? 'teal' : 'gray'}
                onClick={() => methods.setValue('category', id)}
              >
                {name}
              </Button>
            );
          })}
        </Flex>
      </Flex>

      <Flex align='flex-start' gap={9}>
        <CatalogAside />
        <Box>
          <CatalogCards products={products} />
        </Box>
      </Flex>
    </FormProvider>
  );
}
