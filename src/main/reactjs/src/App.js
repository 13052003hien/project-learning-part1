import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Chuyển hướng từ trang gốc đến login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Trang đăng nhập */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Trang đăng ký */}
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Trang Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersPage />} />
        
        {/* Trang User */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/transactions" element={<div>Transactions Page - Coming Soon</div>} />
        <Route path="/wallets" element={<div>Wallets Page - Coming Soon</div>} />
        <Route path="/categories" element={<div>Categories Page - Coming Soon</div>} />
        
        {/* Redirect old routes */}
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/users" element={<Navigate to="/admin/users" replace />} />
      </Routes>
    </Router>
  );
}

export default App;