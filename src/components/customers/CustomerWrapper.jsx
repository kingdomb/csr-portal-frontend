// CustomerWrapper.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { registeredUsers } from '../../data/registeredUsers.js';
import Card from '../common/Card';
import CustomerSearch from './CustomerSearch';
import CustomerTable from './CustomerTable';
import CustomerPagination from './CustomerPagination';

export default function CustomerWrapper({ setActiveNavItem, setSelectedCustomer }) {
  const navigate = useNavigate();
  const [allCustomers] = useState(registeredUsers);
  const [customers, setCustomers] = useState(registeredUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedCustomers, setSearchedCustomers] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 7;

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(customers.length / customersPerPage);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
    setActiveNavItem('CUSTOMER PROFILE');
    navigate('/customer-profile');
  };

  return (
    <div className="p-6 bg-[#1E293B] text-white">
      <Card className="mb-8">
        <CustomerSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          customers={customers}
          setCustomers={setCustomers}
          setSearchedCustomers={setSearchedCustomers}
          searchedCustomers={searchedCustomers}
          setCurrentPage={setCurrentPage}
          allCustomers={allCustomers}
        />
      </Card>

      <Card className="mb-6 p-4">
        <CustomerTable
          customers={currentCustomers}
          sortConfig={sortConfig}
          requestSort={(key) => {
            let direction = 'asc';
            if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
            setSortConfig({ key, direction });

            const sorted = [...customers].sort((a, b) => {
              if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
              if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
              return 0;
            });
            setCustomers(sorted);
          }}
          handleCustomerClick={handleCustomerClick}
          searchedCustomers={searchedCustomers}
          resetSearch={() => {
            setSearchQuery('');
            setCustomers(allCustomers);
            setSearchedCustomers(false);
            setCurrentPage(1);
          }}
        />
      </Card>

      <CustomerPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        indexOfFirstCustomer={indexOfFirstCustomer}
        indexOfLastCustomer={indexOfLastCustomer}
        totalItems={customers.length}
        itemsPerPage={customersPerPage}
      />
    </div>
  );
}