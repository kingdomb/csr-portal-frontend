// tableColumnClass.js
export function getColumnClass(col) {
  if (col === 'Transaction ID' || col === 'Subscription ID' || col === 'Status') return '';
  return 'hidden 54xl:table-cell';
}
