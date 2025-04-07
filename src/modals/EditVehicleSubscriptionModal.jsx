// EditVehicleSubscriptionModal.jsx
import { useState } from 'react';

import { useCustomerSubscriptions } from '../hooks/useCustomerSubscriptions';
import ModalCard from '../components/common/ModalCard';
import SelectField from '../components/common/SelectField';
import InputField from '../components/common/InputField';

export default function EditVehicleSubscriptionModal({
  selectedSubscription,
  setSelectedSubscription,
  setShowEditModal,
}) {
  const { customerSubscriptions, setCustomerSubscriptions } = useCustomerSubscriptions();
  const isNew = !selectedSubscription;

  const [edited, setEdited] = useState(
    selectedSubscription ?? {
      'Subscription ID': '',
      'Cust. Id': '',
      'Vehicle Type': '',
      Make: '',
      Model: '',
      Year: '',
      'License Plate': '',
      'Subscription Plan': '',
      'Start Date': '',
      'End Date': '',
      Status: '',
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const requiredFields = Object.keys(edited);
    const newErrors = {};
    for (const field of requiredFields) {
      if (!edited[field]?.toString().trim()) {
        newErrors[field] = 'Required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const close = () => {
    setShowEditModal(false);
    setSelectedSubscription(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = Object.fromEntries(
      Object.entries(edited).map(([k, v]) => [k, v?.toString().trim()])
    );
    setEdited(trimmed);

    if (!validateFields()) return;

    if (isNew) {
      setCustomerSubscriptions([...customerSubscriptions, trimmed]);
    } else {
      const updated = customerSubscriptions.map((sub) =>
        sub['Subscription ID'] === trimmed['Subscription ID'] ? trimmed : sub
      );
      setCustomerSubscriptions(updated);
    }
    setSelectedSubscription(trimmed);
    close();
  };

  return (
    <ModalCard
      title={isNew ? 'Add Vehicle Subscription' : 'Edit Vehicle Subscription'}
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
            form="editVehicleForm"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 transition-colors"
          >
            {isNew ? 'Add Subscription' : 'Save Changes'}
          </button>
        </div>
      }
    >
      <form id="editVehicleForm" onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Subscription ID"
          name="Subscription ID"
          value={edited['Subscription ID']}
          onChange={handleChange}
          disabled={!isNew}
          placeholder={isNew ? 'Unique ID' : ''}
          error={errors['Subscription ID']}
        />
        <InputField
          label="Customer RM No."
          name="Cust. Id"
          value={edited['Cust. Id']}
          onChange={handleChange}
          disabled={!isNew}
          placeholder={isNew ? 'Enter RM No.' : ''}
          error={errors['Cust. Id']}
        />
        <SelectField
          label="Vehicle Type"
          name="Vehicle Type"
          value={edited['Vehicle Type']}
          options={['Sedan', 'SUV', 'Truck', 'Motorcycle']}
          onChange={handleChange}
          error={errors['Vehicle Type']}
        />
        <InputField
          label="Make"
          name="Make"
          value={edited['Make']}
          onChange={handleChange}
          error={errors['Make']}
        />
        <InputField
          label="Model"
          name="Model"
          value={edited['Model']}
          onChange={handleChange}
          error={errors['Model']}
        />
        <InputField
          label="Year"
          name="Year"
          value={edited['Year']}
          onChange={handleChange}
          error={errors['Year']}
        />
        <InputField
          label="License Plate"
          name="License Plate"
          value={edited['License Plate']}
          onChange={handleChange}
          error={errors['License Plate']}
        />
        <SelectField
          label="Subscription Plan"
          name="Subscription Plan"
          value={edited['Subscription Plan']}
          options={['Standard', 'Premium', 'Business']}
          onChange={handleChange}
          error={errors['Subscription Plan']}
        />
        <InputField
          label="Start Date"
          name="Start Date"
          type="date"
          value={edited['Start Date']}
          onChange={handleChange}
          error={errors['Start Date']}
        />
        <InputField
          label="End Date"
          name="End Date"
          type="date"
          value={edited['End Date']}
          onChange={handleChange}
          error={errors['End Date']}
        />
        <SelectField
          label="Status"
          name="Status"
          value={edited['Status']}
          options={['Active', 'Suspended', 'Cancelled', 'Expired']}
          onChange={handleChange}
          error={errors['Status']}
        />
      </form>
    </ModalCard>
  );
}
