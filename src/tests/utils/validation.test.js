// validation.test.js
import { validateCustomerFields, validateLoginFields } from '../../utils/validation';

describe('validateCustomerFields()', () => {
  const required = ['Name', 'Email', 'Phone'];

  it('returns true when all required fields are valid', () => {
    const data = {
      Name: 'John Doe',
      Email: 'john@example.com',
      Phone: '1234567890',
    };
    expect(validateCustomerFields(data, required)).toBe(true);
  });

  it('returns false if one or more fields are missing', () => {
    const data = {
      Name: 'John Doe',
      Email: '',
      Phone: '1234567890',
    };
    expect(validateCustomerFields(data, required)).toBe(false);
  });

  it('returns false if a field is whitespace only', () => {
    const data = {
      Name: '   ',
      Email: 'john@example.com',
      Phone: '1234567890',
    };
    expect(validateCustomerFields(data, required)).toBe(false);
  });

  it('returns true with extra unused fields', () => {
    const data = {
      Name: 'Jane',
      Email: 'jane@example.com',
      Phone: '999',
      Extra: 'Ignore this',
    };
    expect(validateCustomerFields(data, required)).toBe(true);
  });

  it('returns true for numeric and boolean values', () => {
    const data = {
      Name: 'Alice',
      Email: 'alice@example.com',
      Phone: 0, // falsy value but valid
    };
    expect(validateCustomerFields(data, required)).toBe(true);
  });
});

describe('validateLoginFields()', () => {
  it('returns no errors for valid inputs', () => {
    const result = validateLoginFields({
      username: 'user@example.com',
      password: 'securePass123',
    });
    expect(result).toEqual({});
  });

  it('returns error for empty username and password', () => {
    const result = validateLoginFields({
      username: '',
      password: '',
    });
    expect(result).toEqual({
      username: 'Email is required.',
      password: 'Password is required.',
    });
  });

  it('returns error for invalid email format', () => {
    const result = validateLoginFields({
      username: 'invalid-email',
      password: 'securePass123',
    });
    expect(result).toEqual({
      username: 'Enter a valid email address.',
    });
  });

  it('returns error for password over 16 characters', () => {
    const result = validateLoginFields({
      username: 'user@example.com',
      password: '12345678901234567',
    });
    expect(result).toEqual({
      password: 'Password must be 16 characters or fewer.',
    });
  });
});
