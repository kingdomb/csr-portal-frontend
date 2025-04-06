// CustomerDataTable.jsx
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export default function CustomerDataTable({
  title,
  columns,
  data,
  currentPage,
  setCurrentPage,
  totalItems,
  onSort,
  sortConfig,
  type,
  formatDate,
  statusColors,
  onRowClick,
}) {
  if (!data || data.length === 0) return null;

  const getCellContent = (row, col) => {
    const value = row[col];

    if (col.toLowerCase().includes('date') && formatDate) return formatDate(value);
    if (col === 'Status' && statusColors) {
      const colorClass = statusColors[value?.toLowerCase()] || '';
      return <span className={`px-2 py-1 rounded text-xs ${colorClass}`}>{value}</span>;
    }

    return value;
  };

  const renderClass = (col) => {
    if (col === 'Transaction ID' || col === 'Subscription ID' || col === 'Status') return '';
    return 'hidden 5xl:table-cell';
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
      <div className="mt-3 text-xs text-gray-400">
        Showing {Math.min((currentPage - 1) * 5 + 1, totalItems)}–
        {Math.min(currentPage * 5, totalItems)} of {totalItems}
      </div>
    </div>
  );
}