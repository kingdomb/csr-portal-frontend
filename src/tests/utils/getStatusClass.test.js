// getStatusClass.test.js
import { getStatusClass } from '../../utils/getStatusClass';

describe('getStatusClass()', () => {
  it('returns green class for "Active"', () => {
    expect(getStatusClass('Active')).toBe('text-green-400');
  });

  it('returns red class for "Expired"', () => {
    expect(getStatusClass('Expired')).toBe('text-red-400');
  });

  it('returns white class for unknown statuses', () => {
    expect(getStatusClass('Pending')).toBe('text-white');
    expect(getStatusClass('')).toBe('text-white');
    expect(getStatusClass(undefined)).toBe('text-white');
  });
});