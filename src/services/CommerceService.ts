import type { Product } from '@/types/Product';

const API_URL = import.meta.env.VITE_CT_API_URL as string;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY as string;

export async function getProductByKey(productKey: string, token: string): Promise<Product | undefined> {
  try {
    const response = await fetch(`${API_URL}${PROJECT_KEY}/product-projections/key=${productKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Product not found');
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}
