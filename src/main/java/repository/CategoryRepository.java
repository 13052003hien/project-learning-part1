package repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import model.Category;
import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {
    List<Category> findByUserId(String userId);
    List<Category> findByUserIdAndType(String userId, String type);
}
