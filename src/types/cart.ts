import type { LocalizedString, MasterVariant, Price, PriceValue } from './product';
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
  totalPrice: PriceValue;
  lineItems: LineItem[];
  createdAt: string;
  lastModifiedAt: string;
  totalLineItemQuantity: number;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  anonymousId?: string;
  discountOnTotalPrice?: TotalDiscount;
}

interface TotalDiscount {
  discountedAmount: PriceValue;
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
  price: Price;
  quantity: number;
  totalPrice: PriceValue;
  variant: MasterVariant;
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

export interface ChangeLineItemQuantity extends Action {
  action: 'changeLineItemQuantity';
  lineItemId?: string;
  quantity?: number;
}
