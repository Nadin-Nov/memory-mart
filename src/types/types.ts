export type RawFormData = {
  countryShipping: string | string[] | undefined;
  countryBilling: string | string[] | undefined;
  streetShipping: string;
  cityShipping: string;
  postalCodeShipping: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetBilling: string;
  cityBilling: string;
  postalCodeBilling: string;
  copyToBilling?: boolean;
  defaultShippingAddress?: boolean;
  defaultBillingAddress?: boolean;
};

export type CountryCode = 'US' | 'BY' | 'RU';

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

export interface FormProps {
  email: string;
  password: string;
}

export interface CustomerDraft {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses?: Address[];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Address {
  key: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Customer {
  id: string;
  version: number;
  email: string;
  addresses: Address[];
  isEmailVerified: boolean;
  createdAt: string;
  key?: string;
}

//TODO: implement cart interface

export interface CustomerSignInResult {
  customer: Customer;
  cart?: unknown;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  errors?: ErrorObject[];
}

export interface ErrorObject {
  code: string;
  message: string;
}
