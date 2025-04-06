// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';
import { AuthProvider } from './authentication/AuthProvider';
import NavigationProvider from './context/NavigationContext';
import { CustomerModalProvider } from './context/CustomerModalContext';
import PrivateRoute from './authentication/PrivateRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NavigationProvider>
          <CustomerModalProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <App />
                  </PrivateRoute>
                }
              />
            </Routes>
          </CustomerModalProvider>
        </NavigationProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
