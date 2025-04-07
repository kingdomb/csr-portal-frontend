// Main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';
import { AuthProvider } from './authentication/AuthProvider';
import { CustomerProvider } from './context/CustomerContext';
import NavigationProvider from './context/NavigationContext';
import { CustomerModalProvider } from './context/CustomerModalContext';
import { LoadingProvider } from './context/LoadingContext';
import { CustomerTransactionsProvider } from './context/CustomerTransactionsContext';
import { CustomerSubscriptionProvider } from './context/CustomerSubscriptionContext';
import PrivateRoute from './authentication/PrivateRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CustomerProvider>
          <NavigationProvider>
            <CustomerModalProvider>
              <LoadingProvider>
                <CustomerTransactionsProvider>
                  <CustomerSubscriptionProvider>
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
                  </CustomerSubscriptionProvider>
                </CustomerTransactionsProvider>
              </LoadingProvider>
            </CustomerModalProvider>
          </NavigationProvider>
        </CustomerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
