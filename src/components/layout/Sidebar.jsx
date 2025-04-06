// Sidebar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUsers,
  FaFolder,
  FaAngleLeft,
  FaAngleRight,
  FaIdCard,
  FaCar,
  FaClipboardList,
} from 'react-icons/fa';

import { useNavigation } from '../../context/useNavigation';
import { useCustomerModals } from '../../context/CustomerModalContext';
import SidebarBranding from './SidebarBranding';
import SubMenuList from './SubMenuList';

const Sidebar = () => {
  const navigate = useNavigate();
  const { selectedCustomer, activeNavItem, setActiveNavItem } = useNavigation();

  const {
    setShowEditModal,
    setShowEditTransactionModal,
    setShowEditVehicleSubscriptionModal,
    setSelectedTransaction,
    setSelectedSubscription,
  } = useCustomerModals();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCollapsedUI, setIsCollapsedUI] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState(false);
  const timeoutRef = useRef(null);

  const BREAKPOINT = 1280;

  const mainNavItems = [
    { name: 'CUSTOMERS', icon: <FaUsers />, path: '/customers' },
    { name: 'CUSTOMER PROFILE', icon: <FaFolder />, path: '/customer-profile' },
  ];

  const customerProfileSubItems = [
    {
      name: 'EDIT CUSTOMER DETAILS',
      icon: <FaIdCard />,
      action: () => selectedCustomer && setShowEditModal(true),
      disabled: !selectedCustomer,
    },
    {
      name: 'ADD TRANSACTION',
      icon: <FaClipboardList />,
      action: () => {
        setSelectedTransaction(null);
        setShowEditTransactionModal(true);
      },
      disabled: !selectedCustomer,
    },
    {
      name: 'ADD VEHICLE SUBSCRIPTION',
      icon: <FaCar />,
      action: () => {
        setSelectedSubscription(null);
        setShowEditVehicleSubscriptionModal(true);
      },
      disabled: !selectedCustomer,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const screenIsLarge = window.innerWidth >= BREAKPOINT;
      if (screenIsLarge !== isLargeScreen && !manuallyToggled) {
        setIsCollapsed(!screenIsLarge);
      }
      setIsLargeScreen(screenIsLarge);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLargeScreen, manuallyToggled]);

  useEffect(() => {
    if (!isCollapsed) {
      setIsCollapsedUI(false);
      timeoutRef.current = setTimeout(() => setIsFooterVisible(true), 10);
    } else {
      setIsFooterVisible(false);
      timeoutRef.current = setTimeout(() => {
        setIsCollapsedUI(true);
      }, 300);
    }
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [isCollapsed]);

  const handleMainNavClick = (itemName, path) => {
    setActiveNavItem(itemName);
    navigate(path);
    if (
      !isLargeScreen &&
      (itemName !== 'CUSTOMER PROFILE' || customerProfileSubItems.every((sub) => sub.disabled))
    ) {
      setIsCollapsed(true);
      setManuallyToggled(true);
    }
  };

  return (
    <div className="flex">
      <div
        className={`bg-[#1E293B] border-r border-gray-700 h-screen transition-all duration-300 relative ${
          isCollapsedUI ? 'w-16' : 'w-64'
        } shrink-0`}
      >
        <div className="bg-[#0F172A] px-4 py-5 text-white flex items-center justify-between min-h-16">
          <SidebarBranding isCollapsedUI={isCollapsedUI} />
          <button
            onClick={() => {
              setIsCollapsed(!isCollapsed);
              setManuallyToggled(true);
            }}
            className="text-gray-300"
          >
            {isCollapsed ? <FaAngleRight size={20} /> : <FaAngleLeft size={20} />}
          </button>
        </div>

        <nav className="mt-6">
          <ul>
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <div
                  onClick={() => handleMainNavClick(item.name, item.path)}
                  className={`flex items-center gap-3 p-3 cursor-pointer transition-colors duration-200 hover:bg-[#334155] ${
                    isCollapsedUI ? 'justify-center' : ''
                  } ${activeNavItem === item.name ? 'bg-[#334155]' : ''}`}
                  title={isCollapsedUI ? item.name : ''}
                >
                  <div className="text-[#38BDF8]">{item.icon}</div>
                  {!isCollapsedUI && <span className="text-white font-medium">{item.name}</span>}
                </div>

                {item.name === 'CUSTOMER PROFILE' && activeNavItem === 'CUSTOMER PROFILE' && (
                  <SubMenuList items={customerProfileSubItems} isCollapsedUI={isCollapsedUI} />
                )}
              </li>
            ))}
          </ul>
        </nav>

        {isFooterVisible && (
          <div
            className={`absolute bottom-4 w-full text-center text-xs text-gray-500 transition-opacity duration-300 ${
              isFooterVisible ? 'opacity-100' : 'opacity-0'
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