import type { ReactElement} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useInfiniteScroll } from '@/utils/hooks/useInfiniteScroll';
import { getFilteredProducts } from '@/services/CommerceService';
import { LocalStorageService } from '@/services/LocalStorageService';
import type { ProductFilters, Product } from '@/types/product';
import type { userData} from '@/utils/validateUserData';
import { isUserData } from '@/utils/validateUserData';
import { Flex, Heading, Button, Box } from '@chakra-ui/react';
import { useForm, useWatch, FormProvider } from 'react-hook-form';
import CatalogAside from './CatalogAside';
import CatalogCards from './CatalogCards';

const subcategories = [
  { name: 'All', id: '608ac8c4-bd6b-410b-9dcb-ce07e9e186b7' },
  { name: 'Memory & Nostalgia', id: 'ab178765-bfcb-41c2-902e-7a8437802c64' },
  { name: 'Magic & Whimsy', id: 'd14afe83-39b0-4401-a6fa-f71db634caa6' },
  { name: 'Home Comforts', id: 'ae25d3e8-b7e1-4ccf-94d2-5614b3b8b37f' },
];

const DEBOUNCE_TIME = 400;

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
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState<number | undefined>();
  const [initialLoad, setInitialLoad] = useState(true);

  const lastFetchedPage = useRef<number | undefined>(undefined);
  const isFetchingReference = useRef(false);

  const stored = LocalStorageService.getItem<userData>('userData', isUserData);

  const fetchProducts = useCallback(async () => {
    if (!stored?.token) return;
    if (isFetchingReference.current) return;
    if (total !== undefined && products.length >= total) return;
    if (lastFetchedPage.current === page) return;

    isFetchingReference.current = true;
    lastFetchedPage.current = page;

    try {
      const response = await getFilteredProducts({
        token: stored.token,
        filters: { ...debouncedFilters, page },
      });

      setProducts((previous) => [...previous, ...response.results]);
      setTotal(response.total);
      setPage((previous) => previous + 1);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      isFetchingReference.current = false;
    }
  }, [stored?.token, page, debouncedFilters, total, products.length]);

  useEffect(() => {
    setProducts([]);
    setTotal(undefined);
    setPage(1);
    setInitialLoad(true);
    lastFetchedPage.current = undefined;
  }, [debouncedFilters, stored?.token]);

  useEffect(() => {
    if (stored?.token && total === undefined && initialLoad) {
      fetchProducts();

      setInitialLoad(false);
    }
  }, [stored?.token, total, fetchProducts, initialLoad]);

  const bottomReference = useInfiniteScroll(fetchProducts);

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
          {(total === undefined || products.length < total) && <div ref={bottomReference} style={{ height: 1 }} />}
        </Box>
      </Flex>
    </FormProvider>
  );
}
