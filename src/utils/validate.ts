const MIN_PASSWORD_LENGTH = 8;
const MIN_NAME_LENGTH = 1;
const MIN_STREET_LENGTH = 1;
const MIN_CITY_LENGTH = 1;
const MIN_AGE = 14;

export const validateEmail = (email: string): string | true => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Email must be valid';
  }
  if (/^\s|\s$/.test(email)) {
    return 'Email must not contain leading or trailing whitespace.';
  }

  return true;
};

export const validateCity = (city: string): string | true => {
  if (city.length < MIN_CITY_LENGTH) {
    return `City must be at least 1 character long`;
  }
  if (/[^А-Яа-яA-Za-z]/.test(city)) {
    return `City can't contain special characters or numbers`;
  }
  if (/^\s|\s$/.test(city)) {
    return 'City must not contain leading or trailing whitespace.';
  }
  return true;
};

export const validateDate = (date: string): string | true => {
  const birthDate = new Date(date);
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  let calculatedAge = currentYear - birthYear;

  if (currentMonth < birthMonth - 1) {
    calculatedAge--;
  }
  if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
    calculatedAge--;
  }

  if (calculatedAge < MIN_AGE) {
    return 'User must be 14 years old or older';
  }

  return true;
};

export const validateName = (name: string): string | true => {
  if (name.length < MIN_NAME_LENGTH) {
    return `Name must be at least 1 character long`;
  }
  if (/[^А-Яа-яA-Za-z]/.test(name)) {
    return `Name can't contain special characters or numbers`;
  }
  if (/^\s|\s$/.test(name)) {
    return 'Name must not contain leading or trailing whitespace.';
  }
  return true;
};

export const validateStreet = (street: string): string | true => {
  if (street.length < MIN_STREET_LENGTH) {
    return `Street must be at least 1 character long`;
  }
  if (/^\s|\s$/.test(street)) {
    return 'Street must not contain leading or trailing whitespace.';
  }
  return true;
};

export const validatePassword = (password: string): string | true => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return 'Password must be at least 8 characters long.';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter (A-Z).';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter (a-z).';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one digit (0-9).';
  }

  if (/^\s|\s$/.test(password)) {
    return 'Password must not contain leading or trailing whitespace.';
  }

  return true;
};

export const validatePostalCode = (code: string, country: 'US' | 'RU' | 'BY'): string | true => {
  if (/^\s|\s$/.test(code)) {
    return 'Postal code must not contain leading or trailing whitespace.';
  }
  switch (country) {
    case 'US': {
      if (!/^\d{5}(-\d{4})?$/.test(code)) {
        return 'Postal code must be in the format 12345 or 12345-6789';
      }
      break;
    }

    case 'RU': {
      if (!/^[1-6]\d{5}$/.test(code)) {
        return 'Russian postal code must be 6 digits and start with 1–6';
      }
      break;
    }

    case 'BY': {
      if (!/^2\d{5}$/.test(code)) {
        return 'Belarusian postal code must be 6 digits and start with 2';
      }
      break;
    }

    default: {
      return 'Unsupported country for postal code validation';
    }
  }

  return true;
};
