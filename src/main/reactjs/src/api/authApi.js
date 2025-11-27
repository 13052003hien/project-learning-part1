import axios from 'axios';

const API_URL = '/api/auth';

const authApi = {
    register: (userData) => axios.post(`${API_URL}/register`, userData),
    
    login: (credentials) => axios.post(`${API_URL}/login`, credentials),
    
    checkAuth: () => axios.get(`${API_URL}/check`),
    
    // Lưu thông tin user vào localStorage
    setCurrentUser: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    // Lấy thông tin user từ localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('currentUser');
        return userStr ? JSON.parse(userStr) : null;
    },
    
    // Xóa thông tin user (logout)
    logout: () => {
        localStorage.removeItem('currentUser');
    }
};

export default authApi;
