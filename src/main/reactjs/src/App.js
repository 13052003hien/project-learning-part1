import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
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
        
        {/* Trang Home */}
        <Route path="/home" element={<HomePage />} />
        
        {/* Trang quản lý Users */}
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </Router>
  );
}

export default App;