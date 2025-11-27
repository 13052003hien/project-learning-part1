import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import userApi from "../api/userApi";
import authApi from "../api/authApi";
import '../styles/Dashboard.css';

function UsersPage() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Kiểm tra đăng nhập và quyền admin
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
        
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            console.log('Fetching users...');
            const response = await userApi.getUsers();
            console.log('Users data:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            console.error("Error response:", error.response);
            alert('Không thể tải danh sách users: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa user này?')) {
            userApi.deleteUser(id)
                .then(() => {
                    alert('Xóa thành công!');
                    fetchUsers();
                })
                .catch(error => console.error('Lỗi khi xóa:', error));
        }
    };

    return (
        <div className="dashboard-container">
            <Header title="Quản Lý Users" />
            
            <div className="dashboard-content">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h3>👥 Danh sách người dùng</h3>
                        <div className="stats-badge">
                            Tổng: {users.length} users
                        </div>
                    </div>

                    <div className="users-table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Họ và Tên</th>
                                    <th>Số điện thoại</th>
                                    <th>Vai trò</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td><strong>{user.username}</strong></td>
                                        <td>{user.email}</td>
                                        <td>{user.fullName}</td>
                                        <td>{user.phone}</td>
                                        <td>
                                            {user.roles?.map(role => (
                                                <span 
                                                    key={role.id} 
                                                    className="role-badge"
                                                    style={{
                                                        background: role.name === 'ROLE_ADMIN' ? '#667eea' : '#51CF66',
                                                        color: 'white',
                                                        padding: '0.3rem 0.8rem',
                                                        borderRadius: '12px',
                                                        fontSize: '0.85rem',
                                                        marginRight: '0.5rem'
                                                    }}
                                                >
                                                    {role.name.replace('ROLE_', '')}
                                                </span>
                                            ))}
                                        </td>
                                        <td>
                                            <button 
                                                onClick={() => handleDelete(user.id)}
                                                className="btn btn-sm btn-danger"
                                                style={{marginRight: '0.5rem'}}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UsersPage;