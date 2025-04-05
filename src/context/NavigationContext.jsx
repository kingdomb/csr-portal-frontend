/* eslint-disable import/order */
// NavigationContext.jsx
import { useState } from 'react';
import { NavigationContext } from './navigation-context';

export default function NavigationProvider({ children }) {
  const [activeNavItem, setActiveNavItem] = useState('CUSTOMERS');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <NavigationContext.Provider
      value={{
        activeNavItem,
        setActiveNavItem,
        selectedCustomer,
        setSelectedCustomer,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}