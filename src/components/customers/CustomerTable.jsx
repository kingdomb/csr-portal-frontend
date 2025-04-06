// CustomerTable.jsx
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function CustomerTable({
  loading,
  customers,
  sortConfig,
  requestSort,
  handleCustomerClick,
}) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <svg
          className="animate-spin h-8 w-8 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!customers || customers.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-700 text-white text-xs md:text-sm">
        <thead className="bg-[#1E293B]">
          <tr>
            <SortableHeader
              label="Name"
              sortKey="Name"
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
            <SortableHeader
              label="Email"
              sortKey="Email"
              sortConfig={sortConfig}
              requestSort={requestSort}
              extraClass="hidden 6xl:table-cell"
            />
            <SortableHeader
              label="Phone"
              sortKey="Phone"
              sortConfig={sortConfig}
              requestSort={requestSort}
              extraClass="hidden 6xl:table-cell"
            />
            <SortableHeader
              label="Account Status"
              sortKey="Account Status"
              sortConfig={sortConfig}
              requestSort={requestSort}
            />
          </tr>
        </thead>
        <tbody className="bg-[#0F172A] divide-y divide-gray-700">
          {customers.map((customer, i) => (
            <tr
              key={i}
              className="hover:bg-[#1e293b] cursor-pointer transition-colors duration-150"
              onClick={() => handleCustomerClick(customer)}
            >
              <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">{customer['Name']}</td>
              <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden 6xl:table-cell">
                {customer['Email']}
              </td>
              <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden 6xl:table-cell">
                {customer['Phone']}
              </td>
              <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                {customer['Account Status']}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortableHeader({ label, sortKey, sortConfig, requestSort, extraClass = '' }) {
  return (
    <th
      className={`px-3 md:px-6 py-3 text-left text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-[#334155] ${extraClass}`}
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {sortConfig.key === sortKey &&
          (sortConfig.direction === 'asc' ? (
            <FaChevronUp className="ml-1 h-3 w-3" />
          ) : (
            <FaChevronDown className="ml-1 h-3 w-3" />
          ))}
      </div>
    </th>
  );
}
