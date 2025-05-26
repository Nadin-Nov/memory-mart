import type { Address, CustomerDraft } from '@/services/AuthService/types';
import type { RawFormData } from '@/types/types';

function extractCountry(value: string | string[] | undefined): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return '';
}

export function normalizeFormData(raw: RawFormData): CustomerDraft {
  const countryShipping = extractCountry(raw.countryShipping);
  const countryBilling = extractCountry(raw.countryBilling);

  const shippingAddress: Address = {
    key: 'addr1',
    streetName: raw.streetShipping,
    city: raw.cityShipping,
    postalCode: raw.postalCodeShipping,
    country: countryShipping,
  };

  let addresses: Address[];

  if (raw.copyToBilling) {
    addresses = [
      shippingAddress,
      {
        key: 'addr2',
        streetName: raw.streetShipping,
        city: raw.cityShipping,
        postalCode: raw.postalCodeShipping,
        country: countryShipping,
      },
    ];
  } else {
    const billingAddress: Address = {
      key: 'addr2',
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
    ...(raw.defaultBillingAddress !== undefined && { defaultBillingAddress: 1 }),
    ...(raw.defaultShippingAddress !== undefined && { defaultShippingAddress: 0 }),
  };
}
