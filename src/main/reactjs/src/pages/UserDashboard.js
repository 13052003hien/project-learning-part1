import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { StatsCard, Card } from '../components/Cards';
import authApi from '../api/authApi';
import walletApi from '../api/walletApi';
import transactionApi from '../api/transactionApi';
import categoryApi from '../api/categoryApi';
import '../styles/Dashboard.css';

function UserDashboard() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stats, setStats] = useState({
        totalBalance: 0,
        monthlyIncome: 0,
        monthlyExpense: 0,
        walletsCount: 0
    });
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const user = authApi.getCurrentUser();
        if (!user) {
            navigate('/login');
            return;
        }

        const isAdmin = user.roles?.some(role => role.name === 'ROLE_ADMIN');
        if (isAdmin) {
            navigate('/admin/dashboard');
            return;
        }

        setCurrentUser(user);
        initializeUserData(user.id);
        loadDashboardData(user.id);
    }, [navigate]);

    const initializeUserData = async (userId) => {
        try {
            // Kiểm tra và khởi tạo dữ liệu mặc định nếu chưa có
            const walletsRes = await walletApi.getWalletsByUserId(userId);
            if (walletsRes.data.length === 0) {
                await walletApi.initializeDefaultWallet(userId);
            }

            const categoriesRes = await categoryApi.getCategoriesByUserId(userId);
            if (categoriesRes.data.length === 0) {
                await categoryApi.initializeDefaultCategories(userId);
            }
        } catch (error) {
            console.error('Error initializing user data:', error);
        }
    };

    const loadDashboardData = async (userId) => {
        try {
            // Load wallets
            const walletsRes = await walletApi.getWalletsByUserId(userId);
            setWallets(walletsRes.data);

            // Calculate total balance
            const totalBalance = walletsRes.data.reduce((sum, wallet) => sum + (wallet.balance || 0), 0);

            // Load transactions
            const transactionsRes = await transactionApi.getTransactionsByUserId(userId);
            const transactions = transactionsRes.data;

            // Calculate monthly income/expense (current month)
            const now = new Date();
            const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const monthlyTransactions = transactions.filter(t => {
                const transDate = new Date(t.transactionDate);
                return transDate >= firstDayOfMonth;
            });

            const monthlyIncome = monthlyTransactions
                .filter(t => t.type === 'INCOME')
                .reduce((sum, t) => sum + t.amount, 0);

            const monthlyExpense = monthlyTransactions
                .filter(t => t.type === 'EXPENSE')
                .reduce((sum, t) => sum + t.amount, 0);

            setStats({
                totalBalance,
                monthlyIncome,
                monthlyExpense,
                walletsCount: walletsRes.data.length
            });

            // Get recent 5 transactions
            const sortedTransactions = transactions
                .sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate))
                .slice(0, 5);
            setRecentTransactions(sortedTransactions);

        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount || 0);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <Header title="Quản Lý Chi Tiêu" />
            
            <div className="dashboard-content">
                <div className="welcome-section">
                    <h2>👋 Xin chào, {currentUser.fullName || currentUser.username}!</h2>
                    <p>Hãy theo dõi chi tiêu của bạn hôm nay</p>
                </div>

                <div className="stats-grid">
                    <StatsCard
                        icon="💰"
                        title="Tổng số dư"
                        value={formatCurrency(stats.totalBalance)}
                        color="primary"
                    />
                    <StatsCard
                        icon="📈"
                        title="Thu nhập tháng này"
                        value={formatCurrency(stats.monthlyIncome)}
                        color="success"
                    />
                    <StatsCard
                        icon="📉"
                        title="Chi tiêu tháng này"
                        value={formatCurrency(stats.monthlyExpense)}
                        color="danger"
                    />
                    <StatsCard
                        icon="👛"
                        title="Số ví"
                        value={stats.walletsCount}
                        color="info"
                    />
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-section">
                        <div className="section-header">
                            <h3>💳 Giao dịch gần đây</h3>
                            <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => navigate('/transactions')}
                            >
                                Xem tất cả
                            </button>
                        </div>
                        
                        {recentTransactions.length === 0 ? (
                            <Card>
                                <p className="no-data">Chưa có giao dịch nào</p>
                            </Card>
                        ) : (
                            <div className="transactions-list">
                                {recentTransactions.map(transaction => (
                                    <Card key={transaction.id} className="transaction-item">
                                        <div className="transaction-icon">
                                            {transaction.type === 'INCOME' ? '📈' : '📉'}
                                        </div>
                                        <div className="transaction-details">
                                            <p className="transaction-desc">{transaction.description}</p>
                                            <p className="transaction-date">{formatDate(transaction.transactionDate)}</p>
                                        </div>
                                        <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
                                            {transaction.type === 'INCOME' ? '+' : '-'}
                                            {formatCurrency(transaction.amount)}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="dashboard-section">
                        <div className="section-header">
                            <h3>👛 Ví của bạn</h3>
                            <button 
                                className="btn btn-sm btn-primary"
                                onClick={() => navigate('/wallets')}
                            >
                                Quản lý
                            </button>
                        </div>
                        
                        <div className="wallets-grid">
                            {wallets.map(wallet => (
                                <Card key={wallet.id} className="wallet-card">
                                    <div className="wallet-icon" style={{background: wallet.color}}>
                                        {wallet.icon || '💵'}
                                    </div>
                                    <div className="wallet-info">
                                        <p className="wallet-name">{wallet.name}</p>
                                        <p className="wallet-balance">{formatCurrency(wallet.balance)}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="quick-actions">
                    <h3>⚡ Thao tác nhanh</h3>
                    <div className="actions-grid">
                        <button 
                            className="action-card"
                            onClick={() => navigate('/transactions')}
                        >
                            <span className="action-icon">➕</span>
                            <span className="action-title">Thêm giao dịch</span>
                        </button>
                        <button 
                            className="action-card"
                            onClick={() => navigate('/wallets')}
                        >
                            <span className="action-icon">👛</span>
                            <span className="action-title">Quản lý ví</span>
                        </button>
                        <button 
                            className="action-card"
                            onClick={() => navigate('/categories')}
                        >
                            <span className="action-icon">📁</span>
                            <span className="action-title">Danh mục</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
