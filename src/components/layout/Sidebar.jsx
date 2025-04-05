// Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import {
  FaUsers,
  FaFolder,
  FaAngleLeft,
  FaAngleRight,
  FaIdCard,
  FaCar,
  FaClipboardList,
} from 'react-icons/fa';
import logo from '../../assets/amp-logo.svg';

const Sidebar = ({
  selectedCustomer,
  selectedTransaction,
  selectedSubscription,
  setShowEditModal,
  setShowEditTransactionModal,
  setShowEditVehicleSubscriptionModal
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedUI, setIsCollapsedUI] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const newIsMd = window.innerWidth >= 768;
      if (newIsMd !== isMd && !manuallyToggled) {
        setIsCollapsed(!newIsMd);
      }
      setIsMd(newIsMd);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMd, manuallyToggled]);

  useEffect(() => {
    if (!isCollapsed) {
      setIsCollapsedUI(false);
      setIsFooterVisible(true);
      timeoutRef.current = setTimeout(() => setShowFooter(true), 10);
    } else {
      setShowFooter(false);
      timeoutRef.current = setTimeout(() => {
        setIsFooterVisible(false);
        setIsCollapsedUI(true);
      }, 300);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isCollapsed]);

  const mainNavItems = [
    { name: 'CUSTOMERS', icon: <FaUsers /> },
    { name: 'CASES', icon: <FaFolder /> }
  ];

  const caseSubItems = [
    {
      name: 'EDIT CUSTOMER INFO',
      icon: <FaIdCard />,
      action: () => selectedCustomer && setShowEditModal(true),
      disabled: !selectedCustomer,
    },
    {
      name: 'EDIT VEHICLE SUBSCRIPTIONS',
      icon: <FaCar />,
      action: () =>
        selectedSubscription && setShowEditVehicleSubscriptionModal(true),
      disabled: !selectedSubscription,
    },
    {
      name: 'EDIT TRANSACTIONS',
      icon: <FaClipboardList />,
      action: () => selectedTransaction && setShowEditTransactionModal(true),
      disabled: !selectedTransaction,
    },
  ];

  const handleMainNavClick = (itemName) => {
    setActiveNavItem(itemName);
    if (!isMd && (itemName !== 'CUSTOMERS' || caseSubItems.every(sub => sub.disabled))) {
      setIsCollapsed(true);
      setManuallyToggled(true);
    }
  };

  const handleSubItemClick = (subItem) => {
    setActiveNavItem(subItem.name);
    if (subItem.action) subItem.action();
    if (!isMd) {
      setIsCollapsed(true);
      setManuallyToggled(true);
    }
  };

  return (
    <div className='flex'>
      <div
        className={`bg-[#1E293B] border-r border-gray-700 h-screen transition-all duration-300 relative ${
          isCollapsedUI ? 'w-16' : 'w-64'
        }`}
      >
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
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setManuallyToggled(true);
            }}
            className='text-gray-300'
          >
            {isCollapsed ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
          </button>
        </div>

        <nav className='mt-6'>
          <ul>
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <div
                  onClick={() => handleMainNavClick(item.name)}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors duration-200 hover:bg-[#334155] ${
                    isCollapsedUI ? 'justify-center' : ''
                  } ${activeNavItem === item.name ? 'bg-[#334155]' : ''}`}
                >
                  <div className='text-[#38BDF8]'>{item.icon}</div>
                  {!isCollapsedUI && <span className='text-white font-medium'>{item.name}</span>}
                </div>

                {item.name === 'CUSTOMERS' && activeNavItem === 'CUSTOMERS' && (
                  <ul className='ml-4 mt-2'>
                    {caseSubItems.map((subItem) => (
                      <li key={subItem.name}>
                        <button
                          onClick={() => handleSubItemClick(subItem)}
                          disabled={subItem.disabled}
                          className={`flex items-center gap-2 p-2 w-full text-sm rounded-md ${
                            subItem.disabled
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-white hover:bg-[#475569]'
                          }`}
                        >
                          <span>{subItem.icon}</span>
                          {!isCollapsedUI && <span>{subItem.name}</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

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
