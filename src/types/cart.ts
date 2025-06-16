import type { LocalizedString, PriceValue } from './product';
import type { Address } from './types';

export interface MyCartDraft {
  currency: string;
  lineItems?: MyLineItemDraft[];
  customerEmail?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  discountCodes?: string[];
}

export interface Cart {
  id: string;
  version: number;
  totalPrice: number;
  lineItems: LineItem[];
  createdAt: string;
  lastModifiedAt: string;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
}

interface ProductVariantById {
  productId: string;
  variantId?: number;
  sku?: never;
}

interface ProductVariantBySku {
  sku: string;
  productId?: never;
  variantId?: never;
}

interface MyLineItemDraftBase {
  key: string;
  quantity?: number;
  addedAt?: string;
}

export type MyLineItemDraft = MyLineItemDraftBase & (ProductVariantById | ProductVariantBySku);

export interface LineItem {
  id: string;
  productId: string;
  name: LocalizedString;
  price: PriceValue;
  quantity: number;
  totalPrice: PriceValue;
  productSlug?: LocalizedString;
  productKey?: string;
  key?: string;
}

export interface Action {
  action: string;
}

export interface AddLineItemAction extends Action {
  action: 'addLineItem';
  key?: string;
  productId?: string;
  variantId?: number;
  sku?: string;
  quantity?: number;
  addedAt?: string;
}

export interface RemoveLineItemAction extends Action {
  action: 'removeLineItem';
  lineItemId?: string;
  lineItemKey?: string;
  quantity?: number;
}

export interface ApplyPromoCodeAction extends Action {
  action: 'addDiscountCode';
  code?: string;
  key?: string;
  name?: LocalizedString;
}
