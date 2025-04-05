// CustomerPagination.jsx
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CustomerPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  indexOfFirstCustomer,
  indexOfLastCustomer,
  totalItems,
  itemsPerPage,
}) {
  if (totalItems <= itemsPerPage) return null;

  return (
    <div className='bg-[#0F172A] text-white px-4 py-3 border border-gray-700 rounded-lg shadow-sm'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0'>
        <div className='text-sm md:text-base text-gray-200'>
          Showing{' '}
          <span className='font-semibold text-white'>
            {indexOfFirstCustomer + 1}
          </span>{' '}
          to{' '}
          <span className='font-semibold text-white'>
            {Math.min(indexOfLastCustomer, totalItems)}
          </span>{' '}
          of <span className='font-semibold text-white'>{totalItems}</span>{' '}
          results
        </div>

        <nav
          className='inline-flex rounded-md shadow-sm -space-x-px text-sm'
          aria-label='Pagination'
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className='px-2 py-2 bg-[#1E293B] text-gray-400 border border-gray-600 rounded-l-md hover:bg-[#334155]'
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-4 py-2 border border-gray-600 ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#1E293B] text-gray-300 hover:bg-[#334155]'
              }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-2 py-2 bg-[#1E293B] text-gray-400 border border-gray-600 rounded-r-md hover:bg-[#334155]'
          >
            <FaChevronRight />
          </button>
        </nav>
      </div>
    </div>
  );
}
