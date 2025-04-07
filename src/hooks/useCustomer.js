// useCustomer.js
import { useContext } from 'react';

import { CustomerContext } from '../context/CustomerContext';

export const useCustomer = () => useContext(CustomerContext);
