package service;

import org.springframework.stereotype.Service;
import model.Transaction;
import repository.TransactionRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final WalletService walletService;

    public TransactionService(TransactionRepository transactionRepository, WalletService walletService) {
        this.transactionRepository = transactionRepository;
        this.walletService = walletService;
    }

    public Transaction saveTransaction(Transaction transaction) {
        transaction.setUpdatedAt(LocalDateTime.now());
        
        // Cập nhật số dư ví
        if (transaction.getWalletId() != null) {
            Double amount = transaction.getAmount();
            if ("EXPENSE".equals(transaction.getType())) {
                amount = -amount; // Chi tiêu thì trừ
            }
            walletService.updateBalance(transaction.getWalletId(), amount);
        }
        
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(String id, Transaction transactionDetails) {
        Optional<Transaction> oldTransactionOpt = transactionRepository.findById(id);
        if (oldTransactionOpt.isPresent()) {
            Transaction oldTransaction = oldTransactionOpt.get();
            
            // Hoàn lại số dư cũ
            if (oldTransaction.getWalletId() != null) {
                Double oldAmount = oldTransaction.getAmount();
                if ("EXPENSE".equals(oldTransaction.getType())) {
                    oldAmount = -oldAmount;
                }
                walletService.updateBalance(oldTransaction.getWalletId(), -oldAmount);
            }
            
            // Cập nhật thông tin
            oldTransaction.setType(transactionDetails.getType());
            oldTransaction.setAmount(transactionDetails.getAmount());
            oldTransaction.setCategoryId(transactionDetails.getCategoryId());
            oldTransaction.setWalletId(transactionDetails.getWalletId());
            oldTransaction.setDescription(transactionDetails.getDescription());
            oldTransaction.setNote(transactionDetails.getNote());
            oldTransaction.setTransactionDate(transactionDetails.getTransactionDate());
            oldTransaction.setLocation(transactionDetails.getLocation());
            oldTransaction.setUpdatedAt(LocalDateTime.now());
            
            // Cập nhật số dư mới
            if (oldTransaction.getWalletId() != null) {
                Double newAmount = oldTransaction.getAmount();
                if ("EXPENSE".equals(oldTransaction.getType())) {
                    newAmount = -newAmount;
                }
                walletService.updateBalance(oldTransaction.getWalletId(), newAmount);
            }
            
            return transactionRepository.save(oldTransaction);
        }
        return null;
    }

    public List<Transaction> getAllTransactionsByUserId(String userId) {
        return transactionRepository.findByUserId(userId);
    }

    public List<Transaction> getTransactionsByUserIdAndType(String userId, String type) {
        return transactionRepository.findByUserIdAndType(userId, type);
    }

    public List<Transaction> getTransactionsByDateRange(String userId, LocalDateTime start, LocalDateTime end) {
        return transactionRepository.findByUserIdAndTransactionDateBetween(userId, start, end);
    }

    public Optional<Transaction> findById(String id) {
        return transactionRepository.findById(id);
    }

    public void deleteTransaction(String id) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(id);
        if (transactionOpt.isPresent()) {
            Transaction transaction = transactionOpt.get();
            
            // Hoàn lại số dư
            if (transaction.getWalletId() != null) {
                Double amount = transaction.getAmount();
                if ("EXPENSE".equals(transaction.getType())) {
                    amount = -amount;
                }
                walletService.updateBalance(transaction.getWalletId(), -amount);
            }
            
            transactionRepository.deleteById(id);
        }
    }
}
