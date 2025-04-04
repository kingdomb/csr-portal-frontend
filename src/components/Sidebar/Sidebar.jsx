// Sidebar
import { useState, useEffect, useRef } from 'react';
import { FaUsers, FaFolder, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import logo from '../../assets/amp-logo.svg';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isCollapsedUI, setIsCollapsedUI] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isCollapsed) {
      setIsCollapsedUI(false); // instantly expand UI
      setIsFooterVisible(true);
      timeoutRef.current = setTimeout(() => setShowFooter(true), 10);
    } else {
      // start hiding footer before collapse
      setShowFooter(false);
      timeoutRef.current = setTimeout(() => {
        setIsFooterVisible(false);
        setIsCollapsedUI(true); // collapse UI after footer disappears
      }, 300);
    }

    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isCollapsed]);

  return (
    <div className='flex'>
      <div
        className={`bg-[#1E293B] border-r border-gray-700 h-screen transition-all duration-300 relative ${
          isCollapsedUI ? 'w-16' : 'w-64'
        }`}
      >
        {/* Header */}
        <div className='bg-[#0F172A] px-4 py-5 text-white flex items-center justify-between'>
          <div className='flex flex-col items-start'>
            {!isCollapsedUI && (
              <>
                <img src={logo} alt='Logo' className='h-10' />
                <span className='text-white text-lg font-semibold mt-2'>
                  CSR Portal
                </span>
              </>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className='text-gray-300'
          >
            {isCollapsed ? (
              <FaAngleRight size={20} />
            ) : (
              <FaAngleLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className='mt-6'>
          <ul>
            <li
              className={`flex items-center gap-3 p-3 transition-colors duration-200 hover:bg-[#334155] ${
                isCollapsedUI ? 'justify-center' : ''
              }`}
            >
              <FaUsers size={20} className='text-[#38BDF8]' />
              {!isCollapsedUI && (
                <span className='text-white font-medium'>Customers</span>
              )}
            </li>
            <li
              className={`flex items-center gap-3 p-3 transition-colors duration-200 hover:bg-[#334155] ${
                isCollapsedUI ? 'justify-center' : ''
              }`}
            >
              <FaFolder size={20} className='text-gray-400' />
              {!isCollapsedUI && <span className='text-gray-300'>Cases</span>}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        {isFooterVisible && (
          <div
            className={`absolute bottom-4 w-full text-center text-xs text-gray-500 transition-opacity duration-300 ${
              showFooter ? 'opacity-100' : 'opacity-0'
            }`}
          >
            © 2025 AMP Holdings Limited.
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
