import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { getProductByKey } from '@/services/CommerceService';
import { useAuth } from '@/context/useAuth';
import type { Product } from '@/types/product';

import ProductAttributes from '@/components/ProductDetails/ProductAttributes';
import ProductImage from '@/components/ProductDetails/ProductImage';
import ProductInfo from '@/components/ProductDetails/ProductInfo';
import ProductImageModal from '@/components/ProductDetails/ProductImageModal';

const ProductDetailPage = (): JSX.Element => {
  const { userData } = useAuth();
  const { productKey } = useParams<{ productKey: string }>();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const { open, onOpen, onClose } = useDisclosure();
  const [modalInitialIndex, setModalInitialIndex] = useState<number>(0);

  useEffect((): void => {
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

  const name: string = product.name['en-US'] ?? 'No name';
  const description: string = product.description['en-US'] ?? 'No description';

  const handleImageClick = (index: number): void => {
    setModalInitialIndex(index);
    onOpen();
  };

  return (
    <Box px='4' py='6'>
      <Flex gap='4' mt='4' direction={{ base: 'column', md: 'row' }} alignItems='flex-start'>
        <ProductInfo
          name={name}
          description={description}
          masterVariant={product.masterVariant} // Здесь product уже не undefined
        />
        <ProductImage images={product.masterVariant.images} onClick={handleImageClick} />
        <ProductAttributes attributes={product.masterVariant.attributes} />
      </Flex>

      <ProductImageModal
        open={open}
        onClose={onClose}
        images={product.masterVariant.images}
        initialIndex={modalInitialIndex}
      />
    </Box>
  );
};

export default ProductDetailPage;
