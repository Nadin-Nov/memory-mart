import { AuthContext } from '@/context/AuthContext';
import { addLineItemToCart, deleteLineItemFromCart } from '@/services/CartService';
import type { Product } from '@/types/product';
import { addToast } from '@/utils/addToast';
import useCartChecker from '@/utils/hooks/useCartChecker';
import { Button } from '@chakra-ui/react';
import type { ReactElement } from 'react';
import { useContext, useState } from 'react';

interface CartActionButtonProps {
  product: Product;
}

export default function CartActionButton({ product }: CartActionButtonProps): ReactElement {
  const [cartUpdatedAt, setCartUpdatedAt] = useState(Date.now());
  const [loading, setLoading] = useState(false);

  const context = useContext(AuthContext);
  if (!context) throw new Error('AuthContext is missing');
  const { userData } = context;
  const token = userData?.token;

  const { isInCart, lineItemId, cartVersion, activeCartId } = useCartChecker(product.id, cartUpdatedAt);

  const handleClick = async (): Promise<void> => {
    if (!token || !activeCartId || !cartVersion) return;
    setLoading(true);

    let result;
    try {
      if (isInCart && lineItemId) {
        result = await deleteLineItemFromCart(token, activeCartId, cartVersion, lineItemId);
        if (result) {
          addToast('success', 'Whoa!', 'Item is deleted from your cart');
        } else {
          throw new Error('Error deleting item');
        }
      } else {
        result = await addLineItemToCart(token, activeCartId, cartVersion, product.id, product.masterVariant.id);
        if (result) {
          addToast('success', 'Great!', 'Item is added to your cart');
        } else {
          throw new Error('Error adding item');
        }
      }
      if (result) {
        setCartUpdatedAt(new Date(result.lastModifiedAt).getTime());
      }
    } catch (error) {
      addToast('error', 'Whoops...', 'Action failed');
      console.error('Cart action failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      borderRadius={8}
      onClick={(event) => {
        event.stopPropagation();
        handleClick();
      }}
      loading={loading}
      colorPalette={isInCart ? 'pink' : 'teal'}
      size='sm'
      variant='solid'
    >
      {isInCart ? 'Remove' : 'Add to cart'}
    </Button>
  );
}
