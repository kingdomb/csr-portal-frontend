// AuthProvider
import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? { user: JSON.parse(saved) } : null;
  });

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ user });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;