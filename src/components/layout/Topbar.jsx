// Topbar.jsx
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigation } from '../../hooks/useNavigation.js';

const Topbar = ({ username, onLogout }) => {
  const { activeNavItem } = useNavigation();

  return (
    <div className="bg-[#0F172A] text-white flex flex-wrap items-center justify-between px-2 xl:px-4 xl:px-6 py-3 shadow-xl h-16 text-xs xl:text-sm">
      {/* Left group: menu + label + username (on mobile) */}
      <div className="flex items-center gap-2">
        {/* 👇 Mobile-only sidebar toggle */}
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-sidebar'))}
          className="xl:hidden text-white hover:text-blue-400 focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* 👇 Wrap label + username only on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 ml-1 xl:hidden">
          <TopbarLabel label={formatLabel(activeNavItem)} />
          <TopbarUsername username={username} />
        </div>

        {/* 👇 On xl+, show label only (outside this block) */}
        <div className="hidden xl:block">
          <TopbarLabel label={formatLabel(activeNavItem)} />
        </div>
      </div>

      {/* Right group */}
      <div className="hidden xl:flex items-center gap-2 ml-auto">
        <TopbarUsername username={username} />
        <div className="border-l-2 border-white h-5 xl:h-6 xl:h-7 mx-2 xl:mx-3 rounded-full" />
        <TopbarLogout onLogout={onLogout} />
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
