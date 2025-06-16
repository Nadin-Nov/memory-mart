import type { MyCartDraft, Cart, RemoveLineItemAction, AddLineItemAction } from '@/types/cart';
import axios, { type AxiosError } from 'axios';
import { clientAxios, authBearer } from './AuthService';

const CART_NOT_FOUND_STATUS = 404;

export async function createMyCart(token: string, cart?: MyCartDraft): Promise<Cart | undefined> {
  const cartDraft: MyCartDraft = cart ?? { currency: 'USD' };

  try {
    const response = await clientAxios.post('/me/carts', cartDraft, {
      headers: authBearer(token),
    });

    return response.data as Cart;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    return undefined;
  }
}

export async function getActiveCart(token: string): Promise<Cart | undefined> {
  try {
    const response = await clientAxios.get('/me/active-cart', {
      headers: authBearer(token),
    });

    return response.data as Cart;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    return undefined;
  }
}

export async function updateCart(
  token: string,
  cartId: string,
  cartVersion: number,
  actions: (AddLineItemAction | RemoveLineItemAction)[]
): Promise<Cart | undefined> {
  try {
    const response = await clientAxios.post(
      `/me/carts/${cartId}`,
      { version: cartVersion, actions },
      {
        headers: authBearer(token),
      }
    );

    return response.data as Cart;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    return undefined;
  }
}

export async function addLineItemToCart(
  token: string,
  cartId: string,
  cartVersion: number,
  productSku?: string
): Promise<Cart | undefined> {
  const actions: AddLineItemAction[] = [
    {
      action: 'addLineItem',
      sku: productSku,
      quantity: 1,
    },
  ];
  return await updateCart(token, cartId, cartVersion, actions);
}

export async function removeLineItemFromCart(
  token: string,
  cartId: string,
  cartVersion: number,
  lineItemId: string
): Promise<Cart | undefined> {
  const actions: RemoveLineItemAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
      quantity: 1,
    },
  ];
  return await updateCart(token, cartId, cartVersion, actions);
}

export async function deleteLineItemFromCart(
  token: string,
  cartId: string,
  cartVersion: number,
  lineItemId: string
): Promise<Cart | undefined> {
  const actions: RemoveLineItemAction[] = [
    {
      action: 'removeLineItem',
      lineItemId,
    },
  ];
  return await updateCart(token, cartId, cartVersion, actions);
}

export async function getCartItemCount(token: string, cartId?: string): Promise<number> {
  if (!token) return 0;

  try {
    if (cartId) {
      const response = await clientAxios.get<Cart>(`/me/carts/${cartId}`, {
        headers: authBearer(token),
      });

      const cart = response.data;
      if (!cart.lineItems || !Array.isArray(cart.lineItems)) {
        return 0;
      }

      return cart.lineItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    const newCart = await createMyCart(token);
    if (!newCart?.id) {
      return 0;
    }

    return newCart.lineItems?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status !== CART_NOT_FOUND_STATUS) {
      console.error('Failed to fetch cart item count:', error);
    }
    return 0;
  }
}
