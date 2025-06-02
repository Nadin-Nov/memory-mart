import type { FC } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogPositioner,
  DialogCloseTrigger,
  IconButton,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import type { Image as ProductImageType } from '@/types/product';
import ImageSlider from '@/components/ImageSlider/ImageSlider';

interface ProductImageModalProps {
  open: boolean;
  onClose: () => void;
  images: ProductImageType[];
  initialIndex: number;
}

const ProductImageModal: FC<ProductImageModalProps> = ({ open, onClose, images, initialIndex }) => (
  <Dialog.Root
    open={open}
    onOpenChange={(openState) => {
      if (!openState) onClose();
    }}
    modal
  >
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent bg='transparent' boxShadow='none' position='relative' p={0}>
        <DialogCloseTrigger asChild>
          <IconButton aria-label='Close' position='absolute' top={2} right={2} zIndex={2} size='sm' variant='ghost'>
            <AiOutlineClose />
          </IconButton>
        </DialogCloseTrigger>
        <DialogBody p={0}>
          <ImageSlider images={images} initialSlide={initialIndex} maxWidth='100%' />
        </DialogBody>
      </DialogContent>
    </DialogPositioner>
  </Dialog.Root>
);

export default ProductImageModal;
