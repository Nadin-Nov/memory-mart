import type { Address } from './types';

export interface CartLineItem {
  quantity: number;
}

export interface MyCartDraft {
  currency: string;
  customerEmail?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  discountCodes?: string[];
}

export interface Cart {
  id: string;
  version: number;
  key: string;
  createdAt: string;
  lastModifiedAt: string;
  lineItems: CartLineItem[];
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
}
