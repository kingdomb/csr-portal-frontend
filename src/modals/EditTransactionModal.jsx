// EditTransactionModal.jsx
import { useState } from 'react';

import ModalCard from '../components/common/ModalCard';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';

export default function EditTransactionModal({
  selectedTransaction,
  setSelectedTransaction,
  registeredUserTxns = [],
  setTransactions,
  setShowEditModal,
}) {
  const isNew = !selectedTransaction;
  const [edited, setEdited] = useState(
    selectedTransaction ?? {
      'Transaction ID': '',
      'Cust. Id': '',
      'Transaction Date': '',
      Amount: '',
      'Payment Method': '',
      Status: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const close = () => {
    setShowEditModal(false);
    setSelectedTransaction(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      setTransactions([...registeredUserTxns, edited]);
    } else {
      const updated = registeredUserTxns.map((txn) =>
        txn['Transaction ID'] === edited['Transaction ID'] ? edited : txn
      );
      setTransactions(updated);
    }
    setSelectedTransaction(edited);
    close();
  };

  return (
    <ModalCard
      title={isNew ? 'Add Transaction' : 'Edit Transaction'}
      onClose={close}
      footer={
        <div className="flex justify-end gap-3">
          <button onClick={close} type="button" className="btn-outline">
            Cancel
          </button>
          <button type="submit" form="editTransactionForm" className="btn-primary">
            {isNew ? 'Add Transaction' : 'Save Changes'}
          </button>
        </div>
      }
    >
      <form id="editTransactionForm" onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Transaction ID"
          name="Transaction ID"
          value={edited['Transaction ID']}
          onChange={handleChange}
          disabled={!isNew}
        />
        <InputField
          label="Customer RM No."
          name="Cust. Id"
          value={edited['Cust. Id']}
          onChange={handleChange}
          disabled={!isNew}
        />
        <InputField
          label="Transaction Date"
          name="Transaction Date"
          type="datetime-local"
          value={edited['Transaction Date']}
          onChange={handleChange}
        />
        <InputField
          label="Amount"
          name="Amount"
          type="number"
          value={edited['Amount']}
          onChange={handleChange}
        />
        <SelectField
          label="Payment Method"
          name="Payment Method"
          value={edited['Payment Method']}
          options={['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Money']}
          onChange={handleChange}
        />
        <SelectField
          label="Status"
          name="Status"
          value={edited['Status']}
          options={['Pending', 'Completed', 'Failed', 'Refunded']}
          onChange={handleChange}
        />
      </form>
    </ModalCard>
  );
}
