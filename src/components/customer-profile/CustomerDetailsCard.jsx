// CustomerDetailsCard.jsx
import Card from '../common/Card';

export default function CustomerDetailsCard({ customer }) {
  if (!customer) return null;

  const keys = Object.keys(customer);
  const half = Math.ceil(keys.length / 2);
  const left = keys.slice(0, half);
  const right = keys.slice(half);

  const renderFields = (fields) =>
    fields.map((key) => (
      <div key={key} className="flex gap-2 items-start">
        <p className="font-semibold text-white w-32">{key}:</p>
        <p className="text-white flex-1 break-words">{customer[key]}</p>
      </div>
    ));

  return (
    <Card className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-white">Customer Details</h3>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex-1 px-4 py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(left)}
        </div>
        <div className="flex-1 px-4 py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(right)}
        </div>
      </div>
    </Card>
  );
}
