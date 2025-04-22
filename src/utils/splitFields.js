// splitFields.js
export function splitFields(customer) {
  if (!customer) return { left: [], right: [] };

  const left = ['Name', 'Phone', 'Email'];
  const right = ['Cust. Id', 'Account Status', 'Membership'];

  return {
    left: left.filter((key) => key in customer),
    right: right.filter((key) => key in customer),
  };
}