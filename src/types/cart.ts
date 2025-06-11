import type { Address } from './types';

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
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
}
