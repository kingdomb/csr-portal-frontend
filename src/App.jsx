// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import useAuth from './authentication/useAuth.js';
import CustomersPage from './pages/Customers';

function App() {
  const { auth, logout } = useAuth();
  const username = auth?.user?.name;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Topbar username={username} onLogout={logout} />
        <Routes>
          <Route path='/' element={<Navigate to='/customers' replace />} />
          <Route path='/customers' element={<CustomersPage />} />
          {/* Future: <Route path="/cases" element={<CasesPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
