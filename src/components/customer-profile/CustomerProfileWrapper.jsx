// CustomerProfileWrapper.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { customerTransactions } from '../../data/customerTransactions.js';
import { vehicleSubscriptions } from '../../data/vehicleSubscriptions.js';
import EditTransactionModal from '../../modals/EditTransactionModal';
import EditVehicleSubscriptionModal from '../../modals/EditVehicleSubscriptionModal';
import CustomerHeader from './CustomerHeader';
import CustomerDetailsCard from './CustomerDetailsCard';
import CustomerDataTable from './CustomerDataTable';
import Card from '../common/Card';

export default function CustomerProfileWrapper({ selectedCustomer }) {
  const navigate = useNavigate();

  const statusColors = {
    open: 'bg-blue-500 text-white',
    pending: 'bg-yellow-500 text-white',
    completed: 'bg-green-500 text-white',
    escalated: 'bg-red-500 text-white',
  };

  const handleBack = () => {
    navigate('/customers');
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const paginate = (items, currentPage, perPage) => {
    const start = (currentPage - 1) * perPage;
    return items.slice(start, start + perPage);
  };

  const sortData = (data, config) => {
    if (!config.key) return data;
    return [...data].sort((a, b) =>
      a[config.key] < b[config.key]
        ? config.direction === 'asc'
          ? -1
          : 1
        : a[config.key] > b[config.key]
          ? config.direction === 'asc'
            ? 1
            : -1
          : 0
    );
  };

  const [txnSort, setTxnSort] = useState({ key: null, direction: 'asc' });
  const [subSort, setSubSort] = useState({ key: null, direction: 'asc' });

  const [txnPage, setTxnPage] = useState(1);
  const [subPage, setSubPage] = useState(1);

  const [showTxnModal, setShowTxnModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [selectedSub, setSelectedSub] = useState(null);

  const customerTxns = customerTransactions.filter(
    (t) => t['Cust. Id'] === selectedCustomer?.['Cust. Id']
  );

  const customerSubs = vehicleSubscriptions.filter(
    (s) => s['Cust. Id'] === selectedCustomer?.['Cust. Id']
  );

  return (
    <div className="p-6">
      <CustomerHeader onBack={handleBack} />

      {selectedCustomer ? (
        <>
          <CustomerDetailsCard customer={selectedCustomer} />

          <CustomerDataTable
            title="Customer Transactions"
            columns={['Transaction ID', 'Transaction Date', 'Amount', 'Payment Method', 'Status']}
            data={paginate(sortData(customerTxns, txnSort), txnPage, 5)}
            currentPage={txnPage}
            setCurrentPage={setTxnPage}
            totalItems={customerTxns.length}
            onSort={(key) =>
              setTxnSort((prev) => ({
                key,
                direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            sortConfig={txnSort}
            type="customerTransactions"
            formatDate={formatDate}
            statusColors={statusColors}
            onRowClick={(txn) => {
              setSelectedTxn(txn);
              setShowTxnModal(true);
            }}
          />

          <CustomerDataTable
            title="Vehicle Subscriptions"
            columns={['Subscription ID', 'Vehicle Type', 'Make', 'Model', 'Status']}
            data={paginate(sortData(customerSubs, subSort), subPage, 5)}
            currentPage={subPage}
            setCurrentPage={setSubPage}
            totalItems={customerSubs.length}
            onSort={(key) =>
              setSubSort((prev) => ({
                key,
                direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
              }))
            }
            sortConfig={subSort}
            type="subscriptions"
            statusColors={statusColors}
            onRowClick={(sub) => {
              setSelectedSub(sub);
              setShowSubModal(true);
            }}
          />
        </>
      ) : (
        <Card>
          <p className="text-gray-400 text-center">No customer selected</p>
        </Card>
      )}

      {showTxnModal && selectedTxn && (
        <EditTransactionModal
          selectedTransaction={selectedTxn}
          setSelectedTransaction={setSelectedTxn}
          setShowEditModal={setShowTxnModal}
          customerTransactions={customerTxns}
          setTransactions={() => {}}
        />
      )}

      {showSubModal && selectedSub && (
        <EditVehicleSubscriptionModal
          selectedSubscription={selectedSub}
          setSelectedSubscription={setSelectedSub}
          setShowEditModal={setShowSubModal}
          vehicleSubscriptions={customerSubs}
          setVehicleSubscriptions={() => {}}
        />
      )}
    </div>
  );
}