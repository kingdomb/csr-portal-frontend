// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import { AuthProvider } from './authentication/AuthProvider';
import PrivateRoute from './authentication/PrivateRoute';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route
            path='/*'
            element={
              <PrivateRoute>
                <App />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
