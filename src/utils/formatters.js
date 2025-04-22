// formatters.js
export function trimObjectValues(obj) {
  const trimmed = {};
  for (const key in obj) {
    const value = obj[key];
    trimmed[key] = typeof value === 'string' ? value.trim() : value;
  }
  return trimmed;
}
