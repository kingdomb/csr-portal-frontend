// App.jsx
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import useAuth from './authentication/useAuth.js';

function App() {
  const { auth, logout } = useAuth();
  const username = auth?.user?.name;

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Topbar username={username} onLogout={logout} />
        {/* TODO main content */}
      </div>
    </div>
  );
}

export default App;
