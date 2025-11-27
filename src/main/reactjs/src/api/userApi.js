import axios from 'axios';
const API_URL = 'http://localhost:8080/api/users';

const userApi = {
    getUsers: () => axios.get(API_URL),
    
    getUserById: (id) => axios.get(`${API_URL}${id}`),

    createUser: (userData) => axios.post(API_URL, userData),

    updateUser: (id, userData) => axios.put(`${API_URL}${id}`, userData),

    deleteUser: (id) => axios.delete(`${API_URL}${id}`),
}

export default userApi;