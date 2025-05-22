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
