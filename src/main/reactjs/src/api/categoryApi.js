import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

const categoryApi = {
    getCategoriesByUserId: (userId) => axios.get(`${API_URL}/user/${userId}`),
    
    getCategoriesByType: (userId, type) => axios.get(`${API_URL}/user/${userId}/type/${type}`),
    
    getCategoryById: (id) => axios.get(`${API_URL}/${id}`),
    
    createCategory: (category) => axios.post(API_URL, category),
    
    updateCategory: (id, category) => axios.put(`${API_URL}/${id}`, category),
    
    deleteCategory: (id) => axios.delete(`${API_URL}/${id}`),
    
    initializeDefaultCategories: (userId) => axios.post(`${API_URL}/init/${userId}`)
};

export default categoryApi;
