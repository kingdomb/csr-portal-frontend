// tableCellContent.js
export function getCellData(row, col, formatDate, statusColors) {
  const value = row[col];

  if (col.toLowerCase().includes('date') && formatDate) {
    return formatDate(value);
  }

  if (col === 'Status' && statusColors) {
    const colorClass = statusColors[value?.toLowerCase()] || '';
    return { value, colorClass };
  }

  return value;
}