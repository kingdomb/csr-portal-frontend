// Customers.jsx
import CustomerWrapper from '../components/customers/CustomerWrapper';
import { useNavigation } from '../hooks/useNavigation.js';

export default function CustomersPage() {
  const { setActiveNavItem } = useNavigation();

  return <CustomerWrapper setActiveNavItem={setActiveNavItem} />;
}
