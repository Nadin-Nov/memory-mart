import type { CustomerDetailsType, PersonalDetailsUpdateRequest, PasswordUpdateRequest } from '@/types/types';
import { clientAxios, authBearer } from './AuthService';
import axios from 'axios';

export async function getCustomerDetails(token: string): Promise<CustomerDetailsType | undefined> {
  try {
    const response = await clientAxios.get('/me', { headers: authBearer(token) });
    const data = response.data as CustomerDetailsType;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  return undefined;
}

export async function updateCustomerPersonalDetails(
  token: string,
  updatedData: PersonalDetailsUpdateRequest
): Promise<CustomerDetailsType | undefined> {
  try {
    const response = await clientAxios.post('/me', updatedData, { headers: authBearer(token) });
    const data = response.data as CustomerDetailsType;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  return undefined;
}

export async function updateCustomerPassword(
  token: string,
  updatedData: PasswordUpdateRequest
): Promise<CustomerDetailsType | undefined> {
  try {
    const response = await clientAxios.post('/me/password', updatedData, { headers: authBearer(token) });
    const data = response.data as CustomerDetailsType;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  return undefined;
}
