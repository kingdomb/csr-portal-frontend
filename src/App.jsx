// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import useAuth from './authentication/useAuth.js';
import CustomersPage from './pages/Customers';
import CustomerProfile from './pages/CustomerProfile';

function App() {
  const { auth, logout } = useAuth();
  const username = auth?.user?.name;

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 h-full">
        <Topbar username={username} onLogout={logout} />
        <div className="flex flex-col flex-1 h-[calc(100vh-4rem)] overflow-y-auto bg-[#1E293B]">
          <Routes>
            <Route path="/" element={<Navigate to="/customers" replace />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customer-profile" element={<CustomerProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
