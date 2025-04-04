// Login.jsx
import { useNavigate } from 'react-router-dom'; 
import { useRef, useState } from 'react';
import { authenticateUser } from '../data/userSeed';
import useAuth from '../authentication/useAuth'; 
import logo from '../assets/amp-logo.svg';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate(); 
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const user = authenticateUser(username, password);

    if (!user) {
      setError('Invalid username or password');
    } else {
      login(user);
      navigate('/');
    }
  };

  return (
    <div className='min-h-screen bg-[#1E293B] flex items-center justify-center p-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-[#0F172A] text-white p-8 rounded-lg shadow-lg w-full max-w-sm space-y-6'
      >
        <div className='text-center'>
          <img src={logo} alt='Logo' className='h-12 mx-auto mb-2' />
          <h2 className='text-xl font-semibold'>CSR Portal Login</h2>
        </div>

        {error && <p className='text-red-400 text-sm'>{error}</p>}

        <div className='space-y-4'>
          <input
            ref={usernameRef}
            type='text'
            placeholder='Username'
            className='w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600 focus:outline-none focus:ring'
          />
          <input
            ref={passwordRef}
            type='password'
            placeholder='Password'
            className='w-full px-4 py-2 rounded bg-[#1E293B] text-white border border-gray-600 focus:outline-none focus:ring'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-[#38BDF8] text-black font-semibold py-2 rounded hover:bg-[#0ea5e9] transition'
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;