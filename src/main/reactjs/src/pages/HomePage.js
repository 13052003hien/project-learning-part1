import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import '../styles/Home.css';

function HomePage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Kiểm tra đăng nhập
        const user = authApi.getCurrentUser();
        if (!user) {
            navigate('/login');
        } else {
            setCurrentUser(user);
        }
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
            authApi.logout();
            navigate('/login');
        }
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="nav-brand">My Application</div>
                <div className="nav-menu">
                    <a href="/home">Trang chủ</a>
                    <a href="/users">Quản lý Users</a>
                    <button onClick={handleLogout} className="btn-logout">
                        Đăng xuất
                    </button>
                </div>
            </nav>

            <div className="home-content">
                <div className="welcome-card">
                    <h1>Chào mừng, {currentUser.fullName || currentUser.username}!</h1>
                    
                    <div className="user-info">
                        <h3>Thông tin tài khoản:</h3>
                        <div className="info-item">
                            <strong>Username:</strong> {currentUser.username}
                        </div>
                        <div className="info-item">
                            <strong>Email:</strong> {currentUser.email}
                        </div>
                        <div className="info-item">
                            <strong>Họ và tên:</strong> {currentUser.fullName}
                        </div>
                        <div className="info-item">
                            <strong>Số điện thoại:</strong> {currentUser.phone}
                        </div>
                        <div className="info-item">
                            <strong>Vai trò:</strong> {
                                currentUser.roles?.map(role => role.name).join(', ') || 'N/A'
                            }
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button 
                            onClick={() => navigate('/users')}
                            className="btn-action"
                        >
                            Quản lý Users
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
