import { FormProvider, useForm, useWatch } from 'react-hook-form';
import CatalogAside from './CatalogAside';
import type { ReactElement} from 'react';
import { useEffect, useState } from 'react';
import type { Product, ProductFilters } from '@/types/product';
import CatalogCards from './CatalogCards';
import type { FilteredProductsResponse} from '@/services/CommerceService';
import { getFilteredProducts } from '@/services/CommerceService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { userData} from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { Box, Flex } from '@chakra-ui/react';

export default function Catalog(): ReactElement {
  const methods = useForm<ProductFilters>({ mode: 'onChange' });
  const filters = useWatch({ control: methods.control });

  const [products, setProducts] = useState<Product[]>([]);
  const stored: userData | undefined = LocalStorageService.getItem<userData>('userData', isUserData);

  useEffect((): void => {
    if (!stored?.token) return;

    const fetchProducts = async (): Promise<void> => {
      try {
        const response: FilteredProductsResponse = await getFilteredProducts({
          token: stored.token,
          filters,
        });
        setProducts(response.results);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [filters, stored?.token]);

  return (
    <FormProvider {...methods}>
      <Flex align='flex-start' gap={9}>
        <CatalogAside />
        <Box>
          <CatalogCards products={products} />
        </Box>
      </Flex>
    </FormProvider>
  );
}
