// Login.jsx (controlled inputs version)
// Login.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { authenticateUser } from '../data/csrUsers';
import useAuth from '../authentication/useAuth';
import logo from '../assets/autowash_logo.webp';
import { validateLoginFields } from '../utils/validation';

const Login = () => {
  const [username, setUsername]     = useState('user1@amp.com');
  const [password, setPassword]     = useState('password123*');
  const [focusField, setFocusField] = useState(null);
  const [error, setError]           = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const errs = validateLoginFields({ username, password });
    setValidationErrors(errs);
    if (Object.keys(errs).length) return;

    const user = authenticateUser(username.trim(), password.trim());
    if (!user) {
      setError('Invalid username or password. Please contact your site admin.');
    } else {
      login(user);
      navigate('/');
    }
  };

  const labelClass = (field) => {
    const hasValue = (field === 'username' ? username : password).length > 0;
    const isFocused = focusField === field;
    return `
      absolute left-4 transition-all
      ${hasValue || isFocused
        ? 'top-1.5 text-[11px] text-blue-400'
        : 'top-4 text-base text-gray-500'
      }
    `;
  };

  const inputBorder = (field) =>
    validationErrors[field] ? 'border-red-500' : 'border-gray-600';

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

        {/* Username */}
        <div className="relative">
          <input
            id="loginUsername"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusField('username')}
            onBlur={() => setFocusField(null)}
            autoComplete="username"
            className={`
              w-full bg-[#1E293B] text-white
              px-4 pt-6 pb-1 rounded-3xl border
              ${inputBorder('username')}
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          <label htmlFor="loginUsername" className={labelClass('username')}>
            Username
          </label>
          {validationErrors.username && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.username}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            id="loginPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusField('password')}
            onBlur={() => setFocusField(null)}
            autoComplete="current-password"
            maxLength={16}
            className={`
              w-full bg-[#1E293B] text-white
              px-4 pt-6 pb-1 rounded-3xl border
              ${inputBorder('password')}
              focus:outline-none focus:ring-2 focus:ring-blue-500
            `}
          />
          <label htmlFor="loginPassword" className={labelClass('password')}>
            Password
          </label>
          {validationErrors.password && (
            <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
          )}
          <p className="text-gray-500 text-xs mt-1">Max 16 characters</p>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="
              bg-[#38BDF8] text-black font-semibold py-2 px-8 rounded-3xl
              hover:bg-[#0ea5e9] transition
              animate-pulse hover:animate-none focus:animate-none
            "
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
