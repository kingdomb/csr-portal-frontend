// Topbar.jsx
import { FaSignOutAlt } from 'react-icons/fa';

import { useNavigation } from '../../hooks/useNavigation.js';

const Topbar = ({ username, onLogout }) => {
  const { activeNavItem } = useNavigation();

  return (
    <div className="bg-[#0F172A] text-white flex flex-wrap items-center justify-between px-2 xl:px-4 xl:px-6 py-3 shadow-xl h-16 text-xs xl:text-sm">
      <TopbarLabel label={formatLabel(activeNavItem)} />

      <div className="flex flex-wrap justify-between items-center w-full xl:w-auto mt-2 xl:mt-0 gap-x-2 gap-y-1">
        <TopbarUsername username={username} />

        {/* 👇 Visible only from 448px (xl) and up */}
        <div className="hidden xl:flex items-center gap-2 ml-auto">
          <div className="border-l-2 border-white h-5 xl:h-6 xl:h-7 mx-2 xl:mx-3 rounded-full" />
          <TopbarLogout onLogout={onLogout} />
        </div>
      </div>
    </div>
  );
};

function formatLabel(text = '') {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ');
}

const TopbarLabel = ({ label }) => (
  <h1 className="text-xs xl:text-base xl:text-xl font-bold text-[#38BDF8] tracking-wide">
    {label}
  </h1>
);

const TopbarUsername = ({ username }) => (
  <span className="text-xs xl:text-sm whitespace-normal sm:whitespace-nowrap">
    Welcome, <strong>{username}</strong>
  </span>
);

const TopbarLogout = ({ onLogout }) => (
  <button
    onClick={onLogout}
    className="text-white hover:text-red-400 transition-colors"
    title="Log out"
  >
    <FaSignOutAlt size={16} />
  </button>
);

export default Topbar;