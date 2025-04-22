// CustomerSearch.jsx
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

import { useLoading } from '../../hooks/useLoading.js';
import { filterCustomers } from '../../services/customerService';

export default function CustomerSearch({
  searchQuery,
  setSearchQuery,
  setCustomers,
  setSearchedCustomers,
  searchedCustomers,
  setCurrentPage,
  allCustomers,
}) {
  const { loading, setLoading } = useLoading();

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const filtered = filterCustomers(allCustomers, searchQuery);
      setCustomers(filtered);
      setSearchedCustomers(true);
      setCurrentPage(1);
      setLoading(false);
    }, 300);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCustomers(allCustomers);
    setSearchedCustomers(false);
    setCurrentPage(1);
  };

  return (
    <div className="mb-8">
      <p className="text-gray-300 mb-3 text-sm md:text-base pl-6 md:pl-14">SEARCH CUSTOMER</p>

      {searchedCustomers && (
        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 text-xs md:text-sm">
          <div className="text-gray-600">Search Results:</div>
          <div className="font-medium">{`${allCustomers.length} customers searched`}</div>
          <button
            onClick={resetSearch}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft className="w-4 h-4 mr-1" />
            Back to all customers
          </button>
        </div>
      )}

      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden text-sm md:text-base">
          <div className="flex items-center px-3 md:px-4 bg-gray-100 text-gray-500">
            <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div className="relative w-full">
            <input
              type="text"
              id="customerSearch"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.trimStart())}
              className="peer w-full bg-[#1E293B] text-white placeholder-transparent border-none px-3 md:px-4 pt-6 md:pt-7 pb-1 text-sm md:text-[17px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
            />
            <label
              htmlFor="customerSearch"
              className="absolute left-3 md:left-4 text-[11px] md:text-sm text-gray-400 transition-all
                peer-placeholder-shown:top-4
                peer-placeholder-shown:text-[11px]
                peer-placeholder-shown:text-gray-500
                peer-focus:top-1.5
                peer-focus:text-[11px] md:peer-focus:text-sm
                peer-focus:text-blue-400"
            >
              Name, email, or phone
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="self-center px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-blue-600 text-white hover:bg-blue-700 rounded-full whitespace-nowrap flex items-center justify-center min-h-[34px]"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 mr-2"
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
          ) : (
            <FaSearch className="w-4 h-4 mr-1" />
          )}
          Search
        </button>
      </form>
    </div>
  );
}
