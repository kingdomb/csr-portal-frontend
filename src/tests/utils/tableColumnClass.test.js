// tableColumnClass.test.js
import { getColumnClass } from '../../utils/tableColumnClass';

describe('getColumnClass()', () => {
  it('returns empty string for "Transaction ID"', () => {
    expect(getColumnClass('Transaction ID')).toBe('');
  });

  it('returns empty string for "Subscription ID"', () => {
    expect(getColumnClass('Subscription ID')).toBe('');
  });

  it('returns empty string for "Status"', () => {
    expect(getColumnClass('Status')).toBe('');
  });

  it('returns hidden class for other columns', () => {
    expect(getColumnClass('Created Date')).toBe('hidden 54xl:table-cell');
    expect(getColumnClass('Amount')).toBe('hidden 54xl:table-cell');
  });
});
