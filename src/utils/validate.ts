const MIN_PASSWORD_LENGTH = 8;

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
