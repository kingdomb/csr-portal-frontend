// Login.jsx
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

import { authenticateUser } from '../data/csrUsers';
import useAuth from '../authentication/useAuth';
import logo from '../assets/autowash_logo.webp';

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    const errors = {};
    if (!username) errors.username = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username))
      errors.username = 'Enter a valid email address.';

    if (!password) errors.password = 'Password is required.';
    else if (password.length > 16) errors.password = 'Password must be 16 characters or fewer.';

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const user = authenticateUser(username, password);

    if (!user) {
      setError('Invalid username or password. Please contact your site admin.');
    } else {
      login(user);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#1E293B] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0F172A] text-white p-8 rounded-2xl shadow-lg w-full max-w-sm space-y-6"
      >
        <div className="text-center">
          <img src={logo} alt="Logo" className="h-12 mx-auto mb-2" />
          <h2 className="text-xl font-semibold">CSR Portal Login</h2>
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <div>
            <input
              ref={usernameRef}
              type="text"
              placeholder="Username"
              className={`w-full px-4 py-2 rounded-3xl bg-[#1E293B] text-white border ${
                validationErrors.username ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring`}
            />
            {validationErrors.username && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
            )}
          </div>
          <div>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              maxLength={16}
              className={`w-full px-4 py-2 rounded-3xl bg-[#1E293B] text-white border ${
                validationErrors.password ? 'border-red-500' : 'border-gray-600'
              } focus:outline-none focus:ring`}
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">Max 16 characters</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-[#38BDF8] text-black font-semibold py-2 px-18 rounded-3xl hover:bg-[#0ea5e9] transition"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
