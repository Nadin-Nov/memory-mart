import { getActiveCart } from '@/services/CartService';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function useCartChecker(
  productId: string,
  cartUpdatedAt: number
): {
  isInCart: boolean;
  lineItemId: string | undefined;
  cartVersion: number | undefined;
  activeCartId: string | undefined;
} {
  const [isInCart, setIsInCart] = useState(false);
  const [lineItemId, setLineItemId] = useState<string | undefined>();
  const [cartVersion, setCartVersion] = useState<number | undefined>();
  const [activeCartId, setActiveCartId] = useState<string | undefined>();

  const context = useContext(AuthContext);
  if (!context) throw new Error('Context not found');

  useEffect(() => {
    const { userData, cartId, setCartItemCount } = context;

    const handleCheckIsInCart = async function (): Promise<void> {
      const token = userData?.token;

      if (!token || !cartId || !setCartItemCount) {
        setIsInCart(false);
        setLineItemId(undefined);
        return;
      }

      try {
        const activeCart = await getActiveCart(token);

        if (!activeCart) {
          throw new Error('Getting active cart failed');
        }

        const foundItem = activeCart.lineItems.find((item) => item.productId === productId);

        setActiveCartId(activeCart.id);
        setIsInCart(!!foundItem);
        setLineItemId(foundItem?.id);
        setCartVersion(activeCart.version);
      } catch (error) {
        console.error(error);
        setActiveCartId(undefined);
        setIsInCart(false);
        setLineItemId(undefined);
        setCartVersion(undefined);
      }
    };

    handleCheckIsInCart();
  }, [productId, cartUpdatedAt, context]);

  return { isInCart, lineItemId, cartVersion, activeCartId };
}
