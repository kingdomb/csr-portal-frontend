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
      <div key={key} className="flex flex-col 2xs:flex-row gap-1 2xs:gap-2 items-start break-words">
        <p className="font-semibold text-white w-full 2xs:w-24 sm:w-28 lg:w-32 text-[10px] 2xs:text-xs sm:text-sm lg:text-base">
          {key}:
        </p>
        <p className="text-white flex-1 text-[10px] 2xs:text-xs sm:text-sm lg:text-base">
          {customer[key]}
        </p>
      </div>
    ));

  return (
    <Card className="mb-4 sm:mb-6">
      <div className="mb-3 sm:mb-4">
        <h3 className="text-sm 2xs:text-base sm:text-lg xl:text-xl font-medium text-white">
          Customer Details
        </h3>
      </div>
      <div className="flex flex-col 4xl:flex-row gap-3 sm:gap-4 lg:gap-6 4xl:gap-10">
        <div className="flex-1 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(left)}
        </div>
        <div className="flex-1 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 border border-gray-700 rounded-md bg-[#1E293B] space-y-2">
          {renderFields(right)}
        </div>
      </div>
    </Card>
  );
}