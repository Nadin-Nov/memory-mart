import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductByKey } from '@/services/CommerceService';
import { useAuth } from '@/context/useAuth';
import type { Product } from '@/types/Product';

const cents = 100;
const symb = 2;

const ProductDetailPage = (): JSX.Element => {
  const { userData } = useAuth();
  const { productKey } = useParams<{ productKey: string }>();

  const [product, setProduct] = useState<Product | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect((): void => {
    if (!productKey) {
      setLoading(false);
      return;
    }

    const fetchProduct = async (): Promise<void> => {
      if (!userData?.token) {
        setLoading(false);
        return;
      }

      const data: Product | undefined = await getProductByKey(productKey, userData.token);
      console.log('Fetched product:', data);
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [userData, productKey]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found or invalid structure.</div>;

  const name = product.name['en-US'] ?? 'No name';
  const description = product.description['en-US'] ?? 'No description';
  const slug = product.slug['en-US'] ?? 'No slug';
  const priceCents = product.masterVariant?.prices?.[0]?.value?.centAmount ?? 0;
  const priceDollars = (priceCents / cents).toFixed(symb);
  console.log('Product:', product);

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <p>
        <strong>Price:</strong> ${priceDollars}
      </p>
    </div>
  );
};

export default ProductDetailPage;
