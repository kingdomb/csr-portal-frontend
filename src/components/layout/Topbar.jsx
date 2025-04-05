// Topbar.jsx
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigation } from '../../context/useNavigation';

const Topbar = ({ username, onLogout }) => {
  const { activeNavItem } = useNavigation();

  return (
    <div className="bg-[#0F172A] text-white flex justify-between items-center px-6 py-4 shadow-md h-16">
      <TopbarLabel label={formatLabel(activeNavItem)} />
      <div className="flex items-center gap-4">
        <TopbarUsername username={username} />
        <div className="border-l-2 border-white h-10 mx-4 rounded-full" />
        <TopbarLogout onLogout={onLogout} />
      </div>
    </div>
  );
};

// 🌀 Convert ALL CAPS to Cycle Case
function formatLabel(text = '') {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

const TopbarLabel = ({ label }) => (
  <h1 className="text-2xl font-bold text-[#38BDF8] tracking-wide">{label}</h1>
);

const TopbarUsername = ({ username }) => (
  <span className="text-base">
    Welcome, <strong>{username}</strong>
  </span>
);

const TopbarLogout = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="text-white hover:text-red-400 transition-colors"
    title="Log out"
  >
    <FaSignOutAlt size={20} />
  </button>
);

export default Topbar;
