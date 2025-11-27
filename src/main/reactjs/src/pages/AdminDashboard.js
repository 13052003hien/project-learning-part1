import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { StatsCard } from '../components/Cards';
import authApi from '../api/authApi';
import userApi from '../api/userApi';
import '../styles/Dashboard.css';

function AdminDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalUsers: 0,
        newUsers: 0,
        activeUsers: 0
    });
    const [recentUsers, setRecentUsers] = useState([]);

    useEffect(() => {
        const user = authApi.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }

        const isAdmin = user.roles?.some(role => role.name === 'ROLE_ADMIN');
        if (!isAdmin) {
            navigate('/dashboard');
            return;
        }

        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            const response = await userApi.getUsers();
            const users = response.data;
            
            setStats({
                totalUsers: users.length,
                newUsers: users.filter(u => {
                    // User mới trong 7 ngày (cần thêm trường createdAt trong User entity)
                    return true; // Tạm thời
                }).length,
                activeUsers: users.length
            });
            
            setRecentUsers(users.slice(0, 5));
        } catch (error) {
            console.error('Error loading admin data:', error);
        }
    };

    return (
        <div className="dashboard-container">
            <Header title="Bảng Điều Khiển Admin" />
            
            <div className="dashboard-content">
                <div className="welcome-section">
                    <h2>👋 Chào mừng Admin!</h2>
                    <p>Quản lý hệ thống quản lý chi tiêu sinh hoạt</p>
                </div>

                <div className="stats-grid">
                    <StatsCard
                        icon="👥"
                        title="Tổng số người dùng"
                        value={stats.totalUsers}
                        color="primary"
                    />
                    <StatsCard
                        icon="✨"
                        title="Người dùng mới"
                        value={stats.newUsers}
                        subtitle="7 ngày qua"
                        color="success"
                    />
                    <StatsCard
                        icon="💚"
                        title="Người dùng hoạt động"
                        value={stats.activeUsers}
                        color="info"
                    />
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h3>👥 Người dùng gần đây</h3>
                        <button 
                            className="btn btn-primary"
                            onClick={() => navigate('/admin/users')}
                        >
                            Xem tất cả
                        </button>
                    </div>
                    
                    <div className="users-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Vai trò</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentUsers.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.roles?.map(r => r.name).join(', ') || 'USER'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="quick-actions">
                    <h3>⚡ Thao tác nhanh</h3>
                    <div className="actions-grid">
                        <button 
                            className="action-card"
                            onClick={() => navigate('/admin/users')}
                        >
                            <span className="action-icon">👥</span>
                            <span className="action-title">Quản lý Users</span>
                        </button>
                        <button 
                            className="action-card"
                            onClick={() => alert('Tính năng đang phát triển')}
                        >
                            <span className="action-icon">📊</span>
                            <span className="action-title">Thống kê</span>
                        </button>
                        <button 
                            className="action-card"
                            onClick={() => alert('Tính năng đang phát triển')}
                        >
                            <span className="action-icon">⚙️</span>
                            <span className="action-title">Cài đặt</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
