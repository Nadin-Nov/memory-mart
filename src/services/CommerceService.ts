import axios from 'axios';
import type { Product, Category } from '@/types/product';

const API_URL = import.meta.env.VITE_CT_API_URL as string;
const PROJECT_KEY = import.meta.env.VITE_CT_PROJECT_KEY as string;

export async function getProductByKey(productKey: string, token: string): Promise<Product | undefined> {
  try {
    const response = await axios.get<Product>(`${API_URL}${PROJECT_KEY}/product-projections/key=${productKey}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}

export async function getCategoryById(categoryId: string, token: string): Promise<Category | undefined> {
  try {
    const response = await axios.get<Category>(`${API_URL}${PROJECT_KEY}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return undefined;
  }
}
