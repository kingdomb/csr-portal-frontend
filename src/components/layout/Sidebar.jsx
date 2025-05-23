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
  FaSignOutAlt,
} from 'react-icons/fa';

import { useNavigation } from '../../hooks/useNavigation.js';
import { useCustomerModals } from '../../context/CustomerModalContext';
import { useCustomer } from '../../hooks/useCustomer';
import SidebarBranding from './SidebarBranding';
import SubMenuList from './SubMenuList';
import useAuth from '../../authentication/useAuth';

const Sidebar = ({ forceCollapse = false }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { activeNavItem, setActiveNavItem } = useNavigation();
  const { selectedCustomer } = useCustomer();

  const {
    setShowEditModal,
    setShowEditTransactionModal,
    setShowEditVehicleSubscriptionModal,
    setSelectedTransaction,
    setSelectedSubscription,
  } = useCustomerModals();

  const [isCollapsed, setIsCollapsed] = useState(forceCollapse);
  const [isCollapsedUI, setIsCollapsedUI] = useState(forceCollapse);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [manuallyToggled, setManuallyToggled] = useState(false);
  const timeoutRef = useRef(null);
  const sidebarRef = useRef(null);

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
    const handleToggle = () => {
      setIsCollapsed((prev) => !prev);
      setManuallyToggled(true);
    };
    document.addEventListener('toggle-sidebar', handleToggle);
    return () => document.removeEventListener('toggle-sidebar', handleToggle);
  }, []);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!isLargeScreen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsCollapsed(true);
        setManuallyToggled(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLargeScreen]);

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
        ref={sidebarRef}
        className={`bg-[#1E293B] border-r border-gray-700 h-screen transition-all duration-300 fixed xl:relative top-0 left-0 z-50
          ${isCollapsedUI ? 'w-16 -translate-x-full xl:translate-x-0' : 'w-64 translate-x-0'}
          transform xl:transform-none ease-in-out`}
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

        <div className="xl:hidden absolute bottom-12 left-0 w-full flex justify-center">
          <button
            onClick={logout}
            className="group p-2 rounded-full hover:bg-red-600 transition-colors"
            title="Logout"
          >
            <FaSignOutAlt size={18} className="text-white group-hover:text-white" />
          </button>
        </div>

        {isFooterVisible && (
          <div
            className={`absolute bottom-4 w-full text-center text-xs text-gray-500 transition-opacity duration-300 ${
              isFooterVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            © 2025 B. Major Portfolio
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
