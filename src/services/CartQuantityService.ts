import { clientAxios, authBearer } from './AuthService';
import { LocalStorageService } from './LocalStorageService';
import type { Cart } from '@/types/cart';
import { isUserData } from '@/utils/validateUserData';
import type { userData } from '@/utils/validateUserData';
import type { AxiosError } from 'axios';
import { createMyCart } from './CartService';

const CART_NOT_FOUND_STATUS = 404;

export async function getCartItemCount(): Promise<number> {
  try {
    const userData: userData | undefined = LocalStorageService.getItem<userData>('userData', isUserData);
    const token: string | undefined = userData?.token;

    if (!token) {
      console.warn('No token found');
      return 0;
    }

    let cartId = LocalStorageService.getItem<string>('cartId', (v): v is string => typeof v === 'string');

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
        // Корзина не найдена — удаляем cartId, чтобы создать новую
        LocalStorageService.removeItem('cartId');
        cartId = undefined;
      }
    }

    // Создаём новую корзину, если cartId нет или корзина не найдена
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
