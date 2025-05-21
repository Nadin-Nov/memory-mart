import type { Address, RegistrationFormProps } from '@/services/AuthService/types';

type RawFormData = {
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
  streetBilling?: string;
  cityBilling?: string;
  postalCodeBilling?: string;
  copyToBilling?: boolean;
};

function extractCountry(value: string | string[] | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return '';
}

export function normalizeFormData(raw: RawFormData): RegistrationFormProps {
  const countryShipping = extractCountry(raw.countryShipping);
  const countryBilling = extractCountry(raw.countryBilling);

  const shippingAddress: Address = {
    streetName: raw.streetShipping,
    city: raw.cityShipping,
    postalCode: raw.postalCodeShipping,
    country: countryShipping,
  };

  let addresses: Address[];

  if (raw.copyToBilling) {
    addresses = [shippingAddress];
  } else {
    const billingAddress: Address = {
      streetName: raw.streetBilling ?? '',
      city: raw.cityBilling ?? '',
      postalCode: raw.postalCodeBilling ?? '',
      country: countryBilling,
    };
    addresses = [shippingAddress, billingAddress];
  }

  return {
    email: raw.email,
    password: raw.password,
    firstName: raw.firstName,
    lastName: raw.lastName,
    dateOfBirth: raw.dateOfBirth,
    addresses,
  };
}
