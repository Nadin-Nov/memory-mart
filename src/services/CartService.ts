import type { MyCartDraft, Cart, RemoveLineItemAction, AddLineItemAction } from '@/types/cart';
import axios, { type AxiosError } from 'axios';
import { clientAxios, authBearer } from './AuthService';
import { LocalStorageService } from './LocalStorageService';
import { isUserData } from '@/utils/validateUserData';
import type { userData } from '@/utils/validateUserData';
import { isString } from '@/utils/validate';

const CART_NOT_FOUND_STATUS = 404;

export async function createMyCart(token: string, cart?: MyCartDraft): Promise<Cart | undefined> {
  const cartDraft: MyCartDraft = cart ?? { currency: 'USD' };

  console.log(cartDraft);

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

export async function getCartItemCount(): Promise<number> {
  try {
    const userData: userData | undefined = LocalStorageService.getItem<userData>('userData', isUserData);
    const token: string | undefined = userData?.token;

    if (!token) {
      console.warn('No token found');
      return 0;
    }

    let cartId = LocalStorageService.getItem<string>('cartId', isString);

    if (cartId) {
      try {
        const response = await clientAxios.get<Cart>(`/me/carts/${cartId}`, {
          headers: authBearer(token),
        });

        const cart = response.data;

        if (!cart.lineItems || !Array.isArray(cart.lineItems)) {
          return 0;
        }

        return cart.lineItems.reduce((sum, item) => sum + item.quantity, 0);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status !== CART_NOT_FOUND_STATUS) {
          console.error('Failed to fetch cart by cartId:', error);
          return 0;
        }
        LocalStorageService.removeItem('cartId');
        cartId = undefined;
      }
    }

    const newCart = await createMyCart(token);
    if (!newCart?.id) {
      console.error('Failed to create new cart');
      return 0;
    }

    LocalStorageService.setItem('cartId', newCart.id);

    if (!newCart.lineItems || !Array.isArray(newCart.lineItems)) {
      return 0;
    }

    return newCart.lineItems.reduce((sum, item) => sum + item.quantity, 0);
  } catch (error) {
    console.error('Failed to fetch cart item count:', error);
    return 0;
  }
}
