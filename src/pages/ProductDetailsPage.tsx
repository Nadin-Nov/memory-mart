import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import { getProductByKey } from '@/services/CommerceService';
import { useAuth } from '@/context/useAuth';
import type { Product } from '@/types/product';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import ProductAttributes from '@/components/ProductDetails/ProductAttributes';
import ProductImage from '@/components/ProductDetails/ProductImage';
import ProductInfo from '@/components/ProductDetails/ProductInfo';

const ProductDetailPage = (): JSX.Element => {
  const { userData } = useAuth();
  const { productKey } = useParams<{ productKey: string }>();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!productKey || !userData?.token) {
      setLoading(false);
      return;
    }

    const fetchProduct = async (): Promise<void> => {
      const data = await getProductByKey(productKey, userData.token);
      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [userData, productKey]);

  if (loading) return <Box>Loading...</Box>;
  if (!product) return <Box>Product not found</Box>;

  const name = product.name['en-US'] ?? 'No name';
  const description = product.description['en-US'] ?? 'No description';
  const breadcrumbItems = [{ label: 'Home', path: '/' }, { label: 'Catalog', path: '/catalog' }, { label: name }];

  return (
    <Box px='4' py='6'>
      <Breadcrumbs items={breadcrumbItems} />
      <Flex gap='4' mt='4' direction={{ base: 'column', md: 'row' }}>
        <ProductAttributes attributes={product.masterVariant.attributes} />
        <ProductImage image={product.masterVariant.images[0]} />
        <ProductInfo name={name} description={description} masterVariant={product.masterVariant} />
      </Flex>
    </Box>
  );
};

export default ProductDetailPage;
