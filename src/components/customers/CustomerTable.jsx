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
      <div className='flex justify-center items-center p-12'>
        <svg
          className='animate-spin h-8 w-8 text-blue-400'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-700 text-white'>
        <thead className='bg-[#1E293B]'>
          <tr>
            {Object.keys(customers[0] || {}).map((key) => (
              <th
                key={key}
                className='px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-[#334155]'
                onClick={() => requestSort(key)}
              >
                <div className='flex items-center'>
                  {key}
                  {sortConfig.key === key &&
                    (sortConfig.direction === 'asc' ? (
                      <FaChevronUp className='ml-1 h-3 w-3' />
                    ) : (
                      <FaChevronDown className='ml-1 h-3 w-3' />
                    ))}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-[#0F172A] divide-y divide-gray-700'>
          {customers.map((customer, i) => (
            <tr
              key={i}
              className='hover:bg-[#1e293b] cursor-pointer transition-colors duration-150'
              onClick={() => handleCustomerClick(customer)}
            >
              {Object.values(customer).map((value, j) => (
                <td
                  key={j}
                  className='px-6 py-4 whitespace-nowrap text-base text-white'
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
