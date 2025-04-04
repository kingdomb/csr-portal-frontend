import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';

function App() {
  const [username, setUsername] = useState('Jane Doe');

  const handleLogout = () => {
    console.log('Logging out...');
    // Add your logout logic here, e.g., clearing auth tokens, redirecting, etc.
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Topbar username={username} onLogout={handleLogout} />
        {/* Main Content Goes Here */}
      </div>
    </div>
  );
}

export default App;
