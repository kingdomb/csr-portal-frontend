// EditTransactionModal.jsx
import { useState } from 'react';

import ModalCard from '../components/common/ModalCard';
import InputField from '../components/common/InputField';
import SelectField from '../components/common/SelectField';
import { useCustomerTransactions } from '../hooks/useCustomerTransactions';

import { validateCustomerFields } from '../utils/validation';
import { trimObjectValues } from '../utils/formatters';

export default function EditTransactionModal({
  selectedTransaction,
  setSelectedTransaction,
  setShowEditModal,
}) {
  const isNew = !selectedTransaction;
  const { customerTransactions, setCustomerTransactions } = useCustomerTransactions();

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

  const [errors, setErrors] = useState({});

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

    const trimmed = trimObjectValues(edited);
    setEdited(trimmed);

    const requiredFields = Object.keys(trimmed);
    const isValid = validateCustomerFields(trimmed, requiredFields);

    if (!isValid) {
      setErrors(
        Object.fromEntries(
          requiredFields.map((field) => [field, !trimmed[field] ? 'Required' : ''])
        )
      );
      return;
    }

    if (isNew) {
      setCustomerTransactions([...customerTransactions, trimmed]);
    } else {
      const updated = customerTransactions.map((txn) =>
        txn['Transaction ID'] === trimmed['Transaction ID'] ? trimmed : txn
      );
      setCustomerTransactions(updated);
    }

    setSelectedTransaction(trimmed);
    close();
  };

  return (
    <ModalCard
      title={isNew ? 'Add Transaction' : 'Edit Transaction'}
      onClose={close}
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            type="button"
            className="rounded-xl border border-gray-500 px-4 py-2 text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="editTransactionForm"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors"
          >
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
          placeholder={isNew ? 'Enter unique ID' : ''}
          error={errors['Transaction ID']}
        />
        <InputField
          label="Customer RM No."
          name="Cust. Id"
          value={edited['Cust. Id']}
          onChange={handleChange}
          disabled={!isNew}
          placeholder={isNew ? 'Enter RM number' : ''}
          error={errors['Cust. Id']}
        />
        <InputField
          label="Transaction Date"
          name="Transaction Date"
          type="datetime-local"
          value={edited['Transaction Date']}
          onChange={handleChange}
          error={errors['Transaction Date']}
        />
        <InputField
          label="Amount"
          name="Amount"
          type="number"
          value={edited['Amount']}
          onChange={handleChange}
          placeholder={isNew ? 'e.g. 100.00' : ''}
          error={errors['Amount']}
        />
        <SelectField
          label="Payment Method"
          name="Payment Method"
          value={edited['Payment Method']}
          options={['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Money']}
          onChange={handleChange}
          error={errors['Payment Method']}
        />
        <SelectField
          label="Status"
          name="Status"
          value={edited['Status']}
          options={['Pending', 'Completed', 'Failed', 'Refunded']}
          onChange={handleChange}
          error={errors['Status']}
        />
      </form>
    </ModalCard>
  );
}
