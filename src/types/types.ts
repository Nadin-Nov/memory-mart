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

export type CustomerDetailsType = Pick<
  authenticatedCustomer,
  'version' | 'id' | 'email' | 'firstName' | 'lastName' | 'dateOfBirth' | 'password' | 'addresses'
>;

export interface CustomerDetailsTypeWithToken extends CustomerDetailsType {
  token?: string;
}
export interface PersonalDetailsUpdateRequest {
  version: number;
  actions: Record<string, string>[];
}

export interface PersonalDetailsForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
}

export interface PasswordUpdateRequest {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export interface HeaderProps {
  cartItemCount?: number;
}
