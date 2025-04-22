// CustomerDetailsCard.jsx
import Card from '../common/Card';
import { splitFields } from '../../utils/splitFields';
import { getStatusClass } from '../../utils/getStatusClass';

export default function CustomerDetailsCard({ customer }) {
  if (!customer) return null;

  const { left, right } = splitFields(customer);

  const renderFields = (fields) =>
    fields.map((key) => {
      const value = customer[key];
      const isStatus = key.toLowerCase() === 'account status';
      const statusClass = isStatus ? getStatusClass(value) : 'text-white';

      return (
        <div key={key} className="flex flex-col lg:flex-row gap-1 lg:gap-2 items-start break-words">
          <p className="font-semibold text-white w-full lg:w-28 4xl:w-36 text-[11px] lg:text-sm">
            {key}:
          </p>
          <p className={`${statusClass} flex-1 text-[11px] lg:text-sm`}>{value}</p>
        </div>
      );
    });

  return (
    <Card className="mb-4 lg:mb-6">
      <div className="mb-3 lg:mb-4">
        <h3 className="text-base lg:text-lg 4xl:text-xl font-medium text-white">Customer Details</h3>
      </div>
      <div className="flex flex-col 4xl:flex-row gap-4 4xl:gap-10">
        <div className="flex-1 px-3 lg:px-4 py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(left)}
        </div>
        <div className="flex-1 px-3 lg:px-4 py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(right)}
        </div>
      </div>
    </Card>
  );
}
