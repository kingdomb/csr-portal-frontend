// splitFields.test.js
import { splitFields } from '../../utils/splitFields';

describe('splitFields()', () => {
  it('returns correct left and right groupings when all fields are present', () => {
    const customer = {
      Name: 'Jane Doe',
      Phone: '123-456-7890',
      Email: 'jane@example.com',
      'Cust. Id': 'ID123',
      'Account Status': 'Active',
      Membership: 'Gold',
    };

    const result = splitFields(customer);

    expect(result.left).toEqual(['Name', 'Phone', 'Email']);
    expect(result.right).toEqual(['Cust. Id', 'Account Status', 'Membership']);
  });

  it('filters out missing fields from groups', () => {
    const customer = {
      Name: 'John Smith',
      Email: 'john@example.com',
    };

    const result = splitFields(customer);

    expect(result.left).toEqual(['Name', 'Email']);
    expect(result.right).toEqual([]);
  });

  it('returns empty arrays if customer is null', () => {
    const result = splitFields(null);
    expect(result).toEqual({ left: [], right: [] });
  });
});