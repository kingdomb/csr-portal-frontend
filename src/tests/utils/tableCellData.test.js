// tableCellData.test.js
const { getCellData } = require('../../utils/tableCellData');

describe('getCellData()', () => {
  it('returns formatted date when col includes "date" and formatDate is provided', () => {
    const mockDate = new Date('2024-01-01');
    const mockFormatDate = jest.fn(() => 'Jan 1, 2024');
    const result = getCellData({ createdDate: mockDate }, 'createdDate', mockFormatDate);
    expect(result).toBe('Jan 1, 2024');
    expect(mockFormatDate).toHaveBeenCalledWith(mockDate);
  });

  it('returns value and colorClass when col is "Status" and statusColors is provided', () => {
    const row = { Status: 'Active' };
    const statusColors = { active: 'bg-green-500' };
    const result = getCellData(row, 'Status', undefined, statusColors);
    expect(result).toEqual({ value: 'Active', colorClass: 'bg-green-500' });
  });

  it('returns plain value for non-date, non-status columns', () => {
    const row = { name: 'Alice' };
    const result = getCellData(row, 'name');
    expect(result).toBe('Alice');
  });

  it('returns empty colorClass if status is missing from statusColors map', () => {
    const row = { Status: 'Unknown' };
    const statusColors = { active: 'bg-green-500' };
    const result = getCellData(row, 'Status', undefined, statusColors);
    expect(result).toEqual({ value: 'Unknown', colorClass: '' });
  });
});