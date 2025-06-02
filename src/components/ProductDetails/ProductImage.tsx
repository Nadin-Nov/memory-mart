import type { JSX } from 'react';
import type { Image as ProductImageType } from '@/types/product';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

interface ProductImageProps {
  images: ProductImageType[];
  onClick?: (index: number) => void;
}

const ProductImage = ({ images, onClick }: ProductImageProps): JSX.Element => {
  return <ImageSlider images={images} onClick={onClick} maxWidth='600px' />;
};

export default ProductImage;
