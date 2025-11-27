import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from "../api/userApi";
import authApi from "../api/authApi";

function UsersPage () {
    const navigate = useNavigate();
    const [ users, setUsers ] = useState([]);
    const [ currentUser, setCurrentUser ] = useState(null);

    useEffect(() => {
        // Kiểm tra đăng nhập
        const user = authApi.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        userApi.getUsers()
            .then(response => setUsers(response.data))
            .catch(error => console.error("Error fetching users:", error));
    };

    const handleEdit = (user) => {
        setCurrentUser({...user, password: ''});
    };

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa?')) {
            userApi.deleteUser(id)
                .then(() => {
                    alert('Xóa thành công!');
                    fetchUsers();
                })
                .catch(error => console.error('Lỗi khi xoá:', error));
        }
    };

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
            authApi.logout();
            navigate('/login');
        }
    };

    return (
        <div className="users-page-container">
            <nav style={navbarStyle}>
                <div style={navBrandStyle}>User Management</div>
                <div style={navMenuStyle}>
                    <a href="/home" style={navLinkStyle}>Trang chủ</a>
                    <a href="/users" style={navLinkStyle}>Quản lý Users</a>
                    <button onClick={handleLogout} style={btnLogoutStyle}>
                        Đăng xuất
                    </button>
                </div>
            </nav>

            <div style={contentStyle}>
                <h1>Quản Lý Người Dùng</h1>
                <div className="users-list-area">
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>Username</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Họ và Tên</th>
                                <th style={thStyle}>Số điện thoại</th>
                                <th style={thStyle}>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={tdStyle}>{user.username}</td>
                                    <td style={tdStyle}>{user.email}</td>
                                    <td style={tdStyle}>{user.fullName}</td>
                                    <td style={tdStyle}>{user.phone}</td>
                                    <td style={tdStyle}>
                                        <button 
                                            onClick={() => handleEdit(user)}
                                            style={btnEditStyle}
                                        >
                                            Sửa
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id)}
                                            style={btnDeleteStyle}
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
    );
}

// Inline styles
const navbarStyle = {
    background: 'white',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
};

const navBrandStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea'
};

const navMenuStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
};

const navLinkStyle = {
    color: '#333',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '5px'
};

const btnLogoutStyle = {
    background: '#ff4757',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600'
};

const contentStyle = {
    padding: '40px 20px',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
};

const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    borderCollapse: 'collapse'
};

const thStyle = {
    padding: '15px',
    textAlign: 'left',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontWeight: '600'
};

const tdStyle = {
    padding: '12px 15px',
    borderBottom: '1px solid #e0e0e0'
};

const btnEditStyle = {
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '6px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '8px'
};

const btnDeleteStyle = {
    background: '#f44336',
    color: 'white',
    border: 'none',
    padding: '6px 15px',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default UsersPage;