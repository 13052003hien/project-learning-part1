import axios from 'axios';

const API_URL = 'http://localhost:8080/api/wallets';

const walletApi = {
    getWalletsByUserId: (userId) => axios.get(`${API_URL}/user/${userId}`),
    
    getWalletById: (id) => axios.get(`${API_URL}/${id}`),
    
    getDefaultWallet: (userId) => axios.get(`${API_URL}/user/${userId}/default`),
    
    createWallet: (wallet) => axios.post(API_URL, wallet),
    
    updateWallet: (id, wallet) => axios.put(`${API_URL}/${id}`, wallet),
    
    deleteWallet: (id) => axios.delete(`${API_URL}/${id}`),
    
    initializeDefaultWallet: (userId) => axios.post(`${API_URL}/init/${userId}`)
};

export default walletApi;
