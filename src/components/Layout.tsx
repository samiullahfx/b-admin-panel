import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Products from '../pages/Products';
import Settings from '../pages/Settings';
import LoginForm from '../pages/LoginForm';

// Higher-order component to protect routes
const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col min-h-screen transition-all duration-300">
        <Header />
        <Routes>
        <Route path="/login" element={<LoginForm />} /> {/* Login route */}
        {/* Protect routes by wrapping them in PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Layout;