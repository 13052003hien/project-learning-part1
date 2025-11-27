package controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import model.Category;
import service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Category>> getCategoriesByUserId(@PathVariable String userId) {
        return ResponseEntity.ok(categoryService.getAllCategoriesByUserId(userId));
    }

    @GetMapping("/user/{userId}/type/{type}")
    public ResponseEntity<List<Category>> getCategoriesByUserIdAndType(
            @PathVariable String userId, 
            @PathVariable String type) {
        return ResponseEntity.ok(categoryService.getCategoriesByUserIdAndType(userId, type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id) {
        return categoryService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category saved = categoryService.saveCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @RequestBody Category categoryDetails) {
        return categoryService.findById(id)
            .map(category -> {
                category.setName(categoryDetails.getName());
                category.setType(categoryDetails.getType());
                category.setIcon(categoryDetails.getIcon());
                category.setColor(categoryDetails.getColor());
                category.setDescription(categoryDetails.getDescription());
                return ResponseEntity.ok(categoryService.saveCategory(category));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/init/{userId}")
    public ResponseEntity<String> initializeDefaultCategories(@PathVariable String userId) {
        categoryService.initializeDefaultCategories(userId);
        return ResponseEntity.ok("Default categories initialized");
    }
}
