// customerService.test.js
import { filterCustomers, updateCustomerList } from '../../services/customerService';

describe('filterCustomers()', () => {
  const customers = [
    { Name: 'Alice Smith', Email: 'alice@example.com', Phone: '1234567890' },
    { Name: 'Bob Johnson', Email: 'bob@example.com', Phone: '5551234567' },
    { Name: 'Carol Adams', Email: 'carol@example.com', Phone: '7890123456' },
  ];

  it('filters by name (case insensitive)', () => {
    const result = filterCustomers(customers, 'alice');
    expect(result).toEqual([customers[0]]);
  });

  it('filters by partial email match', () => {
    const result = filterCustomers(customers, 'bob@');
    expect(result).toEqual([customers[1]]);
  });

  it('filters by phone number substring', () => {
    const result = filterCustomers(customers, '7890');
    expect(result.length).toBe(2); // Alice and Carol
  });

  it('returns all results for empty query', () => {
    const result = filterCustomers(customers, '');
    expect(result).toEqual(customers);
  });

  it('returns empty array when no matches found', () => {
    const result = filterCustomers(customers, 'nomatch');
    expect(result).toEqual([]);
  });
});

describe('updateCustomerList()', () => {
  const list = [
    { 'Cust. Id': '1', Name: 'Alice' },
    { 'Cust. Id': '2', Name: 'Bob' },
  ];

  it('replaces customer with matching Cust. Id', () => {
    const updated = { 'Cust. Id': '2', Name: 'Bobby' };
    const result = updateCustomerList(list, updated);

    expect(result).toEqual([
      { 'Cust. Id': '1', Name: 'Alice' },
      { 'Cust. Id': '2', Name: 'Bobby' },
    ]);
  });

  it('does not modify the list if no match is found', () => {
    const updated = { 'Cust. Id': '3', Name: 'Charlie' };
    const result = updateCustomerList(list, updated);

    expect(result).toEqual(list);
  });

  it('returns a new array (immutability)', () => {
    const updated = { 'Cust. Id': '2', Name: 'Bobby' };
    const result = updateCustomerList(list, updated);

    expect(result).not.toBe(list); // different reference
  });
});
