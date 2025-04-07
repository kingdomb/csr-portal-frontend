/* eslint-disable react-refresh/only-export-components */
// CustomerSubscriptionContext.js
import { createContext, useState, useEffect } from 'react';

import { vehicleSubscriptions } from '../data/vehicleSubscriptions';

export const CustomerSubscriptionContext = createContext();

export function CustomerSubscriptionProvider({ children }) {
  const [customerSubscriptions, setCustomerSubscriptions] = useState([]);

  useEffect(() => {
    setCustomerSubscriptions(vehicleSubscriptions);
  }, []);

  return (
    <CustomerSubscriptionContext.Provider
      value={{ customerSubscriptions, setCustomerSubscriptions }}
    >
      {children}
    </CustomerSubscriptionContext.Provider>
  );
}