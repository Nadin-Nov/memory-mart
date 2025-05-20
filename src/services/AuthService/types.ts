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

export interface RegistrationFormProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
}

export interface Address {
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
}
