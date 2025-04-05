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

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700 mt-4">
      <div className="text-gray-400 text-sm">
        Showing <span className="text-white font-semibold">{indexOfFirstCustomer + 1}</span> to{' '}
        <span className="text-white font-semibold">
          {Math.min(indexOfLastCustomer, totalItems)}
        </span>{' '}
        of <span className="text-white font-semibold">{totalItems}</span>
      </div>

      <div className="flex items-center gap-1">
        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="w-4 h-4 text-white" />
          </button>
        )}

        {visiblePages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="px-2 py-1 text-sm text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-2 py-1 rounded-md text-sm font-medium ${
                page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#334155]'
              }`}
            >
              {page}
            </button>
          )
        )}

        {totalPages > 1 && (
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
