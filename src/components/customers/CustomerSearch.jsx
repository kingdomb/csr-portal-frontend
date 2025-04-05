// CustomerSearch.jsx
import { FaArrowLeft, FaSearch } from 'react-icons/fa';

export default function CustomerSearch({
  loading,
  setLoading,
  searchQuery,
  setSearchQuery,
  customers,
  setCustomers,
  setSearchedCustomers,
  searchedCustomers,
  setCurrentPage,
}) {
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const filtered = customers.filter((customer) =>
        Object.values(customer).some((val) =>
          val.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSearchedCustomers(true);
      setCustomers(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 800);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setCustomers(customers);
    setSearchedCustomers(false);
    setCurrentPage(1);
  };

  return (
    <div className='mb-8'>
      <p className='text-gray-300 mb-3 text-base pl-14'>SEARCH CUSTOMER</p>
      {searchedCustomers && (
        <div className='flex items-center gap-4 mb-2'>
          <div className='text-sm text-gray-600'>Search Results:</div>
          <div className='text-sm font-medium'>{`${customers.length} customers found`}</div>
          <button
            onClick={resetSearch}
            className='flex items-center text-sm text-blue-600 hover:text-blue-800'
          >
            <FaArrowLeft className='w-4 h-4 mr-1' />
            Back to all customers
          </button>
        </div>
      )}

      <form onSubmit={handleSearch} className='flex flex-col sm:flex-row gap-2'>
        <div className='flex-1 flex bg-white rounded-full shadow-sm border border-gray-200 overflow-hidden'>
          <div className='flex items-center px-4 bg-gray-100 text-gray-500'>
            <FaSearch className='w-5 h-5' />
          </div>
          <div className='relative w-full'>
            <input
              type='text'
              id='customerSearch'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='peer w-full bg-[#1E293B] text-white placeholder-transparent border-none px-4 pt-7 pb-2 text-[17px] focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Search'
            />
            <label
              htmlFor='customerSearch'
              className='absolute left-4 text-sm text-gray-400 transition-all
          peer-placeholder-shown:top-5
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-500
          peer-focus:top-2
          peer-focus:text-sm
          peer-focus:text-blue-400
          peer-focus:-translate-y-0.5'
            >
              Search by email, name, or phone number
            </label>
          </div>
        </div>

        <button
          type='submit'
          className='self-center min-h-[38px] px-6 py-3 bg-blue-600 text-white text-base hover:bg-blue-700 rounded-full whitespace-nowrap flex items-center justify-center'
          disabled={loading}
        >
          {loading ? (
            <svg
              className='animate-spin h-4 w-4 mr-2'
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
          ) : (
            <FaSearch className='w-4 h-4 mr-1' />
          )}
          Search
        </button>
      </form>
    </div>
  );
}
