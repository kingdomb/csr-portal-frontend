// customerService.js
export function filterCustomers(customers, query) {
  const trimmedQuery = query.trim().toLowerCase();

  return customers.filter((customer) =>
    ['Name', 'Email', 'Phone'].some((field) =>
      customer[field]?.toString().toLowerCase().includes(trimmedQuery)
    )
  );
}

export function updateCustomerList(existingList, updatedCustomer) {
  return existingList.map((customer) =>
    customer['Cust. Id'] === updatedCustomer['Cust. Id'] ? updatedCustomer : customer
  );
}