// CustomerTable.jsx
import { FaChevronUp, FaChevronDown, FaArrowLeft } from 'react-icons/fa';

export default function CustomerTable({
  customers,
  sortConfig,
  requestSort,
  handleCustomerClick,
  searchedCustomers,
  resetSearch,
}) {
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
          {customers.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm">
                <p>No customers found.</p>
                {searchedCustomers && (
                  <button
                    onClick={resetSearch}
                    className="mt-4 inline-flex items-center text-blue-500 hover:text-blue-700 text-xs md:text-sm"
                  >
                    <FaArrowLeft className="mr-2 w-4 h-4" />
                    Clear Search
                  </button>
                )}
              </td>
            </tr>
          ) : (
            customers.map((customer, i) => {
              const status = customer['Account Status'];
              const statusClass =
                status === 'Active'
                  ? 'bg-green-500 text-white'
                  : status === 'Expired'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-700 text-white';

              return (
                <tr
                  key={i}
                  className="hover:bg-[#1e293b] cursor-pointer transition-colors duration-150"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    {customer['Name']}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden 6xl:table-cell">
                    {customer['Email']}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap hidden 6xl:table-cell">
                    {customer['Phone']}
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })
          )}
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
