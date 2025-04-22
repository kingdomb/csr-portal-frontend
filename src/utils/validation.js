// validation.js
export function validateCustomerFields(customer, requiredFields = []) {
  return requiredFields.every((field) => {
    const value = customer[field];
    return value !== undefined && value !== null && value.toString().trim() !== '';
  });
}

export function validateLoginFields({ username, password }) {
  const errors = {};

  if (!username) {
    errors.username = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
    errors.username = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length > 16) {
    errors.password = 'Password must be 16 characters or fewer.';
  }

  return errors;
}
