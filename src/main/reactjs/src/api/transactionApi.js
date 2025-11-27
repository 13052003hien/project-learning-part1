import axios from 'axios';

const API_URL = 'http://localhost:8080/api/transactions';

const transactionApi = {
    getTransactionsByUserId: (userId) => axios.get(`${API_URL}/user/${userId}`),
    
    getTransactionsByType: (userId, type) => axios.get(`${API_URL}/user/${userId}/type/${type}`),
    
    getTransactionsByDateRange: (userId, start, end) => 
        axios.get(`${API_URL}/user/${userId}/date-range`, {
            params: { start, end }
        }),
    
    getTransactionById: (id) => axios.get(`${API_URL}/${id}`),
    
    createTransaction: (transaction) => axios.post(API_URL, transaction),
    
    updateTransaction: (id, transaction) => axios.put(`${API_URL}/${id}`, transaction),
    
    deleteTransaction: (id) => axios.delete(`${API_URL}/${id}`)
};

export default transactionApi;
