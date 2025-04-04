// Topbar.jsx
import { FaSignOutAlt } from 'react-icons/fa';

const Topbar = ({ username, onLogout }) => {
  return (
    <div className='bg-[#0F172A] text-white flex justify-between items-center px-6 py-4 shadow-md h-16'>
      <TopbarLabel label='Customers' />
      <div className='flex items-center gap-4'>
        <TopbarUsername username={username} />
        <div className='border-l-2 border-white h-10 mx-4 rounded-full' />{' '}
        {/* Adjusted vertical line with rounded edges */}
        <TopbarLogout onLogout={onLogout} />
      </div>
    </div>
  );
};

// Subcomponents
const TopbarLabel = ({ label }) => {
  return <h1 className='text-xl font-semibold'>{label}</h1>;
};

const TopbarUsername = ({ username }) => {
  return (
    <span className='text-base'>
      Welcome, <strong>{username}</strong>
    </span>
  );
};

const TopbarLogout = ({ onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className='text-white hover:text-red-400 transition-colors'
      title='Log out'
    >
      <FaSignOutAlt size={20} />
    </button>
  );
};

export default Topbar;
