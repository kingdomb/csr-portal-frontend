// CustomerModalContext.js
import { createContext, useContext, useState } from 'react';

const CustomerModalContext = createContext();

export function CustomerModalProvider({ children }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditTransactionModal, setShowEditTransactionModal] = useState(false);
  const [showEditVehicleSubscriptionModal, setShowEditVehicleSubscriptionModal] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  return (
    <CustomerModalContext.Provider
      value={{
        showEditModal,
        setShowEditModal,
        showEditTransactionModal,
        setShowEditTransactionModal,
        showEditVehicleSubscriptionModal,
        setShowEditVehicleSubscriptionModal,
        selectedTransaction,
        setSelectedTransaction,
        selectedSubscription,
        setSelectedSubscription,
      }}
    >
      {children}
    </CustomerModalContext.Provider>
  );
}

export const useCustomerModals = () => useContext(CustomerModalContext);