// EditCustomerModal.jsx
import { useState } from 'react';

import ModalCard from '../components/common/ModalCard';
import SelectField from '../components/common/SelectField';
import InputField from '../components/common/InputField';
import { validateCustomerFields } from '../utils/validation';
import { trimObjectValues } from '../utils/formatters';
import { updateCustomerList } from '../services/customerService';

export default function EditCustomerModal({
  selectedCustomer,
  setSelectedCustomer,
  customers,
  setCustomers,
  setShowEditModal,
}) {
  const [edited, setEdited] = useState({ ...selectedCustomer });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const close = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = trimObjectValues(edited);
    setEdited(trimmed);

    const requiredFields = ['Name', 'Email', 'Account Status', 'Membership', 'Cust. Id', 'Phone'];
    const isValid = validateCustomerFields(trimmed, requiredFields);

    if (!isValid) {
      setErrors(
        Object.fromEntries(
          requiredFields.map((field) => [field, !trimmed[field] ? 'Required' : ''])
        )
      );
      return;
    }

    const updated = { ...selectedCustomer, ...trimmed };
    const updatedList = updateCustomerList(customers, updated);
    setCustomers(updatedList);
    if (setSelectedCustomer) setSelectedCustomer(updated);
    close();
  };

  return (
    <ModalCard
      title="Edit Customer Details"
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
            form="editCustomerForm"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors"
          >
            Save Changes
          </button>
        </div>
      }
    >
      <form id="editCustomerForm" onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          name="Name"
          value={edited.Name}
          onChange={handleChange}
          error={errors['Name']}
        />
        <InputField
          label="Great ID (Email)"
          name="Email"
          type="email"
          value={edited['Email']}
          onChange={handleChange}
          error={errors['Email']}
        />
        <SelectField
          label="ID Type"
          name="Account Status"
          value={edited['Account Status']}
          options={['Passport', 'Driver License', 'National ID']}
          onChange={handleChange}
          error={errors['Account Status']}
        />
        <InputField
          label="ID Number"
          name="Membership"
          value={edited['Membership']}
          onChange={handleChange}
          error={errors['Membership']}
        />
        <InputField
          label="RM Number"
          name="Cust. Id"
          value={edited['Cust. Id']}
          disabled
          error={errors['Cust. Id']}
        />
        <InputField
          label="Phone"
          name="Phone"
          value={edited['Phone']}
          onChange={handleChange}
          type="tel"
          error={errors['Phone']}
        />
      </form>
    </ModalCard>
  );
}
