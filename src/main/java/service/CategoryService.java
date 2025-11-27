package service;

import org.springframework.stereotype.Service;
import model.Category;
import repository.CategoryRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category saveCategory(Category category) {
        category.setUpdatedAt(LocalDateTime.now());
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategoriesByUserId(String userId) {
        return categoryRepository.findByUserId(userId);
    }

    public List<Category> getCategoriesByUserIdAndType(String userId, String type) {
        return categoryRepository.findByUserIdAndType(userId, type);
    }

    public Optional<Category> findById(String id) {
        return categoryRepository.findById(id);
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    public void initializeDefaultCategories(String userId) {
        // Khởi tạo categories mặc định cho user mới
        String[][] expenseCategories = {
            {"Ăn uống", "🍔", "#FF6B6B"},
            {"Di chuyển", "🚗", "#4ECDC4"},
            {"Mua sắm", "🛒", "#95E1D3"},
            {"Giải trí", "🎮", "#F38181"},
            {"Y tế", "🏥", "#AA96DA"},
            {"Giáo dục", "📚", "#FCBAD3"},
            {"Nhà cửa", "🏠", "#A8D8EA"}
        };

        for (String[] cat : expenseCategories) {
            Category category = new Category();
            category.setUserId(userId);
            category.setName(cat[0]);
            category.setIcon(cat[1]);
            category.setColor(cat[2]);
            category.setType("EXPENSE");
            categoryRepository.save(category);
        }

        String[][] incomeCategories = {
            {"Lương", "💰", "#51CF66"},
            {"Thưởng", "🎁", "#37B24D"},
            {"Đầu tư", "📈", "#2F9E44"},
            {"Khác", "💵", "#74C0FC"}
        };

        for (String[] cat : incomeCategories) {
            Category category = new Category();
            category.setUserId(userId);
            category.setName(cat[0]);
            category.setIcon(cat[1]);
            category.setColor(cat[2]);
            category.setType("INCOME");
            categoryRepository.save(category);
        }
    }
}
