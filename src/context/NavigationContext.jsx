/* eslint-disable react-refresh/only-export-components */
// NavigationContext.jsx
import { useState, createContext } from 'react';

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

export const NavigationContext = createContext();