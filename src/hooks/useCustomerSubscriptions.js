// useCustomerSubscriptions.js
import { useContext } from 'react';

import { CustomerSubscriptionContext } from '../context/CustomerSubscriptionContext';

export const useCustomerSubscriptions = () => useContext(CustomerSubscriptionContext);
