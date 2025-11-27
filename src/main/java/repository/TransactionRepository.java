package repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import model.Transaction;
import java.time.LocalDateTime;
import java.util.List;

public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByUserId(String userId);
    List<Transaction> findByUserIdAndType(String userId, String type);
    List<Transaction> findByUserIdAndCategoryId(String userId, String categoryId);
    List<Transaction> findByUserIdAndWalletId(String userId, String walletId);
    List<Transaction> findByUserIdAndTransactionDateBetween(String userId, LocalDateTime start, LocalDateTime end);
}
