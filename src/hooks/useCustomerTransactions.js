// useCustomerTransactions.js
import { useContext } from 'react';

import { CustomerTransactionsContext } from '../context/CustomerTransactionsContext';

export const useCustomerTransactions = () => useContext(CustomerTransactionsContext);