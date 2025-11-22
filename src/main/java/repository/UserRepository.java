package repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import model.User;

public interface UserRepository extends MongoRepository<model.User, String> {
    User findByUsername(String username);
    User findByEmail(String email);
    User findByPhone(String phone);
}
