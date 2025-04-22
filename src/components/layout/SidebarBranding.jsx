// SidebarBranding.jsx
import logo from '../../assets/autowash_logo.webp';

const SidebarBranding = ({ isCollapsedUI }) => {
  if (isCollapsedUI) return null;

  return (
    <div className="flex flex-col items-start pl-6">
      <img src={logo} alt="Logo" />
      <span className="text-white text-lg font-semibold mt-2">CSR Portal</span>
    </div>
  );
};

export default SidebarBranding;
