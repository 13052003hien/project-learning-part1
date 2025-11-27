import React from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import '../styles/Components.css';

function Header({ title, showLogout = true, showMenu = true }) {
    const navigate = useNavigate();
    const currentUser = authApi.getCurrentUser();
    
    const isAdmin = currentUser?.roles?.some(role => role.name === 'ROLE_ADMIN');

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
            authApi.logout();
            navigate('/login');
        }
    };

    return (
        <header className="app-header">
            <div className="header-content">
                <div className="header-left">
                    <div className="app-logo">💰</div>
                    <h1 className="app-title">{title || 'Quản Lý Chi Tiêu'}</h1>
                </div>
                
                {showMenu && (
                    <nav className="header-nav">
                        <button 
                            onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/dashboard')}
                            className="nav-btn"
                        >
                            <span>🏠</span> Trang chủ
                        </button>
                        
                        {!isAdmin && (
                            <>
                                <button onClick={() => navigate('/transactions')} className="nav-btn">
                                    <span>💳</span> Giao dịch
                                </button>
                                <button onClick={() => navigate('/wallets')} className="nav-btn">
                                    <span>👛</span> Ví
                                </button>
                                <button onClick={() => navigate('/categories')} className="nav-btn">
                                    <span>📁</span> Danh mục
                                </button>
                            </>
                        )}
                        
                        {isAdmin && (
                            <button onClick={() => navigate('/admin/users')} className="nav-btn">
                                <span>👥</span> Quản lý Users
                            </button>
                        )}
                    </nav>
                )}
                
                <div className="header-right">
                    {currentUser && (
                        <div className="user-info-compact">
                            <span className="user-avatar">{currentUser.avatar || '👤'}</span>
                            <span className="user-name">{currentUser.fullName || currentUser.username}</span>
                        </div>
                    )}
                    {showLogout && (
                        <button onClick={handleLogout} className="logout-btn">
                            Đăng xuất
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
