// CustomerDataTable.jsx
import {
  FaChevronUp,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

import Card from '../common/Card';

export default function CustomerDataTable({
  title,
  columns,
  data,
  currentPage,
  setCurrentPage,
  totalItems,
  onSort,
  sortConfig,
  onRowClick,
  itemsPerPage = 5,
  formatDate,
  statusColors,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className='mt-8'>
      <h3 className='text-lg font-medium text-white mb-4'>{title}</h3>
      <Card className='overflow-hidden p-0'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-700 text-sm'>
            <thead className='bg-[#1E293B] text-gray-400'>
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    scope='col'
                    className='px-6 py-3 text-left uppercase tracking-wider cursor-pointer'
                    onClick={() => onSort(column)}
                  >
                    <div className='flex items-center'>
                      {column}
                      {sortConfig.key === column &&
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
            <tbody className='divide-y divide-gray-800'>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className='hover:bg-[#334155] cursor-pointer transition-colors'
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className='px-6 py-3 text-white whitespace-nowrap'
                    >
                      {col.includes('Date') ? (
                        formatDate?.(item[col])
                      ) : col === 'Status' ? (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors?.[item[col]] ||
                            'bg-gray-600 text-white'
                          }`}
                        >
                          {item[col]}
                        </span>
                      ) : (
                        item[col]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className='flex items-center justify-between px-4 py-3 border-t border-gray-700'>
            <div className='text-gray-400 text-sm'>
              Showing{' '}
              <span className='text-white font-semibold'>
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{' '}
              to{' '}
              <span className='text-white font-semibold'>
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{' '}
              of <span className='text-white font-semibold'>{totalItems}</span>
            </div>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaChevronLeft className='w-4 h-4 text-white' />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 py-1 rounded-md text-sm font-medium ${
                      page === currentPage
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-400 hover:bg-[#334155]'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <FaChevronRight className='w-4 h-4 text-white' />
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}