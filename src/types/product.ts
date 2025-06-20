export interface PriceValue {
  type: 'centPrecision';
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Discount {
  typeId: string;
  id: string;
}

export interface DiscountedPrice {
  value: PriceValue;
  discount: Discount;
}

export interface Price {
  id: string;
  value: PriceValue;
  discounted?: DiscountedPrice;
}

export interface ImageDimensions {
  w: number;
  h: number;
}

export interface Image {
  url: string;
  label: string;
  dimensions: ImageDimensions;
}

export interface AttributeValueLabel {
  key: string;
  label: string;
}

export type AttributeValue = string | AttributeValueLabel;

export interface Attribute {
  name: string;
  value: AttributeValue;
}

export interface AssetSource {
  uri: string;
  key: string;
  dimensions: ImageDimensions;
  contentType: string;
}

export interface Asset {
  id: string;
  sources: AssetSource[];
  name: Record<string, string>;
  description?: Record<string, string>;
  tags?: string[];
}

export interface MasterVariant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: Asset[];
}

export interface LocalizedString {
  [locale: string]: string;
}

export interface CategoryReference {
  typeId: string;
  id: string;
}

export interface UserReference {
  typeId: string;
  id: string;
}

export interface Category {
  id: string;
  name: LocalizedString;
  slug: LocalizedString;
  version?: number;
  parent?: {
    typeId: string;
    id: string;
  };
  ancestors?: {
    typeId: string;
    id: string;
  }[];
}

export interface Product {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: UserReference;
  };
  createdBy: {
    isPlatformClient: boolean;
    user: UserReference;
  };
  productType: {
    typeId: string;
    id: string;
  };
  key: string;
  taxCategory: {
    typeId: string;
    id: string;
  };
  priceMode: string;
  lastVariantId: number;

  name: LocalizedString;
  description: LocalizedString;
  categories: CategoryReference[];
  slug: LocalizedString;
  masterVariant: MasterVariant;
  variants: MasterVariant[];
  published: boolean;
  searchKeywords?: Record<string, string[]>;
  attributes?: Attribute[];
  hasStagedChanges?: boolean;
  categoryOrderHints?: Record<string, string>;
  metaTitle?: LocalizedString;
  metaDescription?: LocalizedString;
}

export type ProductFilters = {
  page?: number;
  category?: string;
  subcategory?: string;
  mood?: string[];
  size?: string[];
  material?: string[];
  popularity?: string[];
  newArrival?: string[];
  priceRange?: [number, number];
  search?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  markMatchingVariants?: boolean;
  fuzzyLevel?: number;
};
