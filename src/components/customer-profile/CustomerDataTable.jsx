// CustomerDataTable.jsx
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function CustomerDataTable({
  title,
  columns,
  data,
  currentPage,
  totalItems,
  onSort,
  sortConfig,
  formatDate,
  statusColors,
  onRowClick,
  setCurrentPage,
}) {
  if (!data || data.length === 0) return null;

  const getCellContent = (row, col) => {
    const value = row[col];
    if (col.toLowerCase().includes('date') && formatDate) return formatDate(value);
    if (col === 'Status' && statusColors) {
      const colorClass = statusColors[value?.toLowerCase()] || '';
      return <span className={`px-2 py-1 rounded-full text-xs ${colorClass}`}>{value}</span>;
    }
    return value;
  };

  const renderClass = (col) => {
    if (col === 'Transaction ID' || col === 'Subscription ID' || col === 'Status') return '';
    return 'hidden 5xl:table-cell';
  };

  const handlePrev = () => setCurrentPage?.((prev) => Math.max(prev - 1, 1));
  const handleNext = () => {
    const maxPage = Math.ceil(totalItems / 5);
    setCurrentPage?.((prev) => Math.min(prev + 1, maxPage));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 text-white text-sm">
          <thead className="bg-[#1E293B]">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  onClick={() => onSort(col)}
                  className={`px-4 py-3 text-left font-medium uppercase tracking-wide cursor-pointer hover:bg-[#334155] ${renderClass(
                    col
                  )}`}
                >
                  <div className="flex items-center">
                    {col}
                    {sortConfig.key === col &&
                      (sortConfig.direction === 'asc' ? (
                        <FaChevronUp className="ml-1 h-3 w-3" />
                      ) : (
                        <FaChevronDown className="ml-1 h-3 w-3" />
                      ))}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-[#0F172A] divide-y divide-gray-700">
            {data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-[#1e293b] cursor-pointer transition-colors"
                onClick={() => onRowClick(row)}
                title="Click to edit"
              >
                {columns.map((col) => (
                  <td key={col} className={`px-4 py-3 ${renderClass(col)}`}>
                    {getCellContent(row, col)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-400 gap-2">
        <div>
          Showing {Math.min((currentPage - 1) * 5 + 1, totalItems)}–
          {Math.min(currentPage * 5, totalItems)} of {totalItems}
        </div>

        {setCurrentPage && totalItems > 5 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1 rounded-md border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1 rounded-md border border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
