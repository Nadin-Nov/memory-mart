import type { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface ImageSliderProps {
  images: { url: string; label?: string }[];
  onClick?: (index: number) => void;
  maxWidth?: string | number;
  initialSlide?: number;
}

const ImageSlider: FC<ImageSliderProps> = ({ images, onClick, maxWidth = '600px', initialSlide = 0 }) => {
  if (!images || images.length === 0) return <Box>No images available</Box>;

  const showNavigation = images.length > 1;

  return (
    <Box
      bg='white'
      borderRadius='md'
      boxShadow='lg'
      overflow='hidden'
      mx='auto'
      maxW={maxWidth}
      pt='16px'
      px='16px'
      pb='80px'
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation={showNavigation}
        pagination={showNavigation ? { clickable: true } : false}
        modules={[Navigation, Pagination]}
        initialSlide={initialSlide}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.url}>
            <Box aspectRatio={1} width='100%' cursor={onClick ? 'pointer' : 'default'} onClick={() => onClick?.(index)}>
              <Image
                src={img.url}
                alt={img.label || `Product image`}
                objectFit='cover'
                w='100%'
                h='100%'
                borderRadius='md'
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageSlider;
