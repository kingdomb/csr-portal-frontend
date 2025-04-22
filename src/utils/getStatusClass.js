// getStatusClass.js
export function getStatusClass(value) {
  if (value === 'Active') return 'text-green-400';
  if (value === 'Expired') return 'text-red-400';
  return 'text-white';
}
