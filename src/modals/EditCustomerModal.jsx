// EditCustomerModal.jsx
import { useState } from 'react';

import ModalCard from '../components/common/ModalCard';
import SelectField from '../components/common/SelectField';
import InputField from '../components/common/InputField';

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

  const validateFields = () => {
    const required = ['Name', 'Email', 'Account Status', 'Membership', 'Cust. Id', 'Phone'];
    const newErrors = {};

    for (const key of required) {
      if (!edited[key]?.toString().trim()) {
        newErrors[key] = 'Required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const close = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = Object.fromEntries(
      Object.entries(edited).map(([k, v]) => [k, v?.toString().trim()])
    );
    setEdited(trimmed);

    if (!validateFields()) return;

    const updated = customers.map((c) => (c['Cust. Id'] === trimmed['Cust. Id'] ? trimmed : c));
    setCustomers(updated);
    if (setSelectedCustomer) setSelectedCustomer(trimmed); 
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
