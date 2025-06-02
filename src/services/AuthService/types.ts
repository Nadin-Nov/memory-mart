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

export interface ModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface authenticatedCustomer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ModifiedBy;
  createdBy: ModifiedBy;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  customerGroupAssignments: unknown[];
  stores: unknown[];
  authenticationMode: string;
}
