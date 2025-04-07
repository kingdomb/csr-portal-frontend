// CustomerProfile.jsx
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useNavigation } from '../hooks/useNavigation.js';
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
    <div className="flex flex-col h-full bg-[#1E293B] text-white">
      {/* Sticky Breadcrumb */}
      <div className="p-6 text-sm text-gray-400 bg-[#1E293B] z-10">
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <CustomerProfileWrapper selectedCustomer={selectedCustomer} />
      </div>
    </div>
  );
}
