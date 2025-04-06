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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const close = () => {
    setShowEditModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = customers.map((c) => (c['Cust. Id'] === edited['Cust. Id'] ? edited : c));
    setCustomers(updated);
    setSelectedCustomer(edited);
    close();
  };

  return (
    <ModalCard
      title="Edit Customer Details"
      onClose={close}
      footer={
        <div className="flex justify-end gap-3">
          <button onClick={close} type="button" className="btn-outline">
            Cancel
          </button>
          <button type="submit" form="editCustomerForm" className="btn-primary">
            Save Changes
          </button>
        </div>
      }
    >
      <form id="editCustomerForm" onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Name" name="Name" value={edited.Name} onChange={handleChange} />
        <InputField
          label="Great ID (Email)"
          name="Email"
          type="email"
          value={edited['Email']}
          onChange={handleChange}
        />
        <SelectField
          label="ID Type"
          name="Account Status"
          value={edited['Account Status']}
          options={['Passport', 'Driver License', 'National ID']}
          onChange={handleChange}
        />
        <InputField
          label="ID Number"
          name="Membership"
          value={edited['Membership']}
          onChange={handleChange}
        />
        <InputField label="RM Number" name="Cust. Id" value={edited['Cust. Id']} disabled />
        <InputField
          label="Phone"
          name="Phone"
          value={edited['Phone']}
          onChange={handleChange}
          type="tel"
        />
      </form>
    </ModalCard>
  );
}
