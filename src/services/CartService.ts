import type { MyCartDraft, Cart } from '@/types/cart';
import axios from 'axios';
import { clientAxios, authBearer } from './AuthService';

export async function createMyCart(token: string, cart?: MyCartDraft): Promise<Cart | undefined> {
  const cartDraft: MyCartDraft = cart ?? { currency: 'EUR' };

  try {
    console.log(cartDraft);
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
