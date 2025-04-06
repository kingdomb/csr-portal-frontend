// CustomerProfile.jsx
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useNavigation } from '../context/useNavigation';
import CustomerProfileWrapper from '../components/customer-profile/CustomerProfileWrapper';

export default function CustomerProfile() {
  const { selectedCustomer, setActiveNavItem } = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCustomer) {
      navigate('/customers');
    }
  }, [selectedCustomer, navigate]);

  return (
    <div className="p-6 bg-[#1E293B] min-h-screen text-white">
      {/* Breadcrumb only */}
      <div className="mb-4 text-sm text-gray-400">
        <Link
          to="/customers"
          className="text-blue-400 hover:underline"
          onClick={() => setActiveNavItem('CUSTOMERS')}
        >
          CUSTOMERS
        </Link>
        <span className="mx-2">›</span>
        <span className="text-white font-semibold">CUSTOMER PROFILE</span>
      </div>

      <CustomerProfileWrapper
        selectedCustomer={selectedCustomer}
      />
    </div>
  );
}
