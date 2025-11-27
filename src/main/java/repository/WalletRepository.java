package repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import model.Wallet;
import java.util.List;
import java.util.Optional;

public interface WalletRepository extends MongoRepository<Wallet, String> {
    List<Wallet> findByUserId(String userId);
    Optional<Wallet> findByUserIdAndIsDefault(String userId, Boolean isDefault);
}
