// CustomerContext.js
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <CustomerContext.Provider value={{ selectedCustomer, setSelectedCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}
