// CustomerPagination.jsx
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function CustomerPagination({
  totalPages,
  currentPage,
  setCurrentPage,
  indexOfFirstCustomer,
  indexOfLastCustomer,
  totalItems,
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between gap-4 px-2 2xl:px-4 py-2 border-t border-gray-700 mt-4 text-sm items-center">
      <div className="text-gray-400 text-center 2xl:text-left">
        Showing <span className="text-white font-semibold">{indexOfFirstCustomer + 1}</span> to{' '}
        <span className="text-white font-semibold">
          {Math.min(indexOfLastCustomer, totalItems)}
        </span>{' '}
        of <span className="text-white font-semibold">{totalItems}</span>
      </div>

      <div className="flex items-center gap-1 flex-wrap justify-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-40"
        >
          <FaChevronLeft className="w-4 h-4 text-white" />
        </button>

        {visiblePages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded-md text-xs 2xl:text-sm font-medium ${
                page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#334155]'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40"
        >
          <FaChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}