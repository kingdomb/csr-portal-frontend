// EditVehicleSubscriptionModal.jsx
import { useState } from 'react';

import ModalCard from '../components/common/ModalCard';
import SelectField from '../components/common/SelectField';
import InputField from '../components/common/InputField';

export default function EditVehicleSubscriptionModal({
  selectedSubscription,
  setSelectedSubscription,
  vehicleSubscriptions = [],
  setVehicleSubscriptions,
  setShowEditModal,
}) {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdited((prev) => ({ ...prev, [name]: value }));
  };

  const close = () => {
    setShowEditModal(false);
    setSelectedSubscription(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      setVehicleSubscriptions([...vehicleSubscriptions, edited]);
    } else {
      const updated = vehicleSubscriptions.map((sub) =>
        sub['Subscription ID'] === edited['Subscription ID'] ? edited : sub
      );
      setVehicleSubscriptions(updated);
    }
    setSelectedSubscription(edited);
    close();
  };

  return (
    <ModalCard
      title={isNew ? 'Add Vehicle Subscription' : 'Edit Vehicle Subscription'}
      onClose={close}
      footer={
        <div className="flex justify-end gap-3">
          <button onClick={close} type="button" className="btn-outline">
            Cancel
          </button>
          <button type="submit" form="editVehicleForm" className="btn-primary">
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
        />
        <InputField
          label="Customer RM No."
          name="Cust. Id"
          value={edited['Cust. Id']}
          onChange={handleChange}
          disabled={!isNew}
        />
        <SelectField
          label="Vehicle Type"
          name="Vehicle Type"
          value={edited['Vehicle Type']}
          options={['Sedan', 'SUV', 'Truck', 'Motorcycle']}
          onChange={handleChange}
        />
        <InputField label="Make" name="Make" value={edited['Make']} onChange={handleChange} />
        <InputField label="Model" name="Model" value={edited['Model']} onChange={handleChange} />
        <InputField label="Year" name="Year" value={edited['Year']} onChange={handleChange} />
        <InputField
          label="License Plate"
          name="License Plate"
          value={edited['License Plate']}
          onChange={handleChange}
        />
        <SelectField
          label="Subscription Plan"
          name="Subscription Plan"
          value={edited['Subscription Plan']}
          options={['Standard', 'Premium', 'Business']}
          onChange={handleChange}
        />
        <InputField
          label="Start Date"
          name="Start Date"
          type="date"
          value={edited['Start Date']}
          onChange={handleChange}
        />
        <InputField
          label="End Date"
          name="End Date"
          type="date"
          value={edited['End Date']}
          onChange={handleChange}
        />
        <SelectField
          label="Status"
          name="Status"
          value={edited['Status']}
          options={['Active', 'Suspended', 'Cancelled', 'Expired']}
          onChange={handleChange}
        />
      </form>
    </ModalCard>
  );
}
