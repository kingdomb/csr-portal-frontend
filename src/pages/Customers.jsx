// Customers.jsx
import CustomerWrapper from '../components/customers/CustomerWrapper';
import { useNavigation } from '../hooks/useNavigation.js';

export default function CustomersPage() {
  const { setSelectedCustomer, setActiveNavItem } = useNavigation();

  return (
    <CustomerWrapper
      setSelectedCustomer={setSelectedCustomer}
      setActiveNavItem={setActiveNavItem}
    />
  );
}
