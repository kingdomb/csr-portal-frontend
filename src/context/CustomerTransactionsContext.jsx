/* eslint-disable react-refresh/only-export-components */
//CustomerTransactionsContext.js
import { createContext, useState } from 'react';

export const CustomerTransactionsContext = createContext();

export function CustomerTransactionsProvider({ children }) {
  const [customerTransactions, setCustomerTransactions] = useState([]);

  return (
    <CustomerTransactionsContext.Provider
      value={{ customerTransactions, setCustomerTransactions }}
    >
      {children}
    </CustomerTransactionsContext.Provider>
  );
}