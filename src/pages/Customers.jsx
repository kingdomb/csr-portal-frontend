// Customers.jsx
import CustomerWrapper from '../components/customers/CustomerWrapper';
import { useNavigation } from '../context/useNavigation';

export default function CustomersPage() {
  const { setSelectedCustomer, setActiveNavItem } = useNavigation();

  return (
    <CustomerWrapper
      setSelectedCustomer={setSelectedCustomer}
      setActiveNavItem={setActiveNavItem}
    />
  );
}
