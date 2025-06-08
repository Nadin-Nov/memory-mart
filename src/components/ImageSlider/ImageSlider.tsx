import type { FC } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './ImageSlider.css';

export interface ImageSliderProps {
  images: { url: string; label?: string }[];
  onClick?: (index: number) => void;
  maxWidth?: string | number;
  initialSlide?: number;
  imageSize?: 'small' | 'large';
}

const ImageSlider: FC<ImageSliderProps> = ({
  images,
  onClick,
  maxWidth = '800px',
  initialSlide = 0,
  imageSize = 'small',
}) => {
  if (!images || images.length === 0) return <Box>No images available</Box>;

  const showNavigation = images.length > 1;
  const imageDim = imageSize === 'large' ? '110%' : '90%';

  return (
    <Box
      maxW={maxWidth}
      mx='auto'
      border='10px solid white'
      borderRadius='md'
      boxShadow='0 4px 12px rgba(0,0,0,0.15)'
      bg='white'
      pt='4px'
      px='4px'
      pb='10px'
      position='relative'
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
            <Box
              aspectRatio={1}
              width='100%'
              cursor={onClick ? 'pointer' : 'default'}
              onClick={() => onClick?.(index)}
              display='flex'
              justifyContent='center'
            >
              <Image
                src={img.url}
                alt={img.label || `Product image`}
                objectFit='cover'
                w={imageDim}
                h={imageDim}
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
