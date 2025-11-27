package controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import dto.AuthResponse;
import dto.LoginRequest;
import dto.RegisterRequest;
import model.Role;
import model.User;
import service.RoleService;
import service.UserService;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    private final UserService userService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UserService userService, RoleService roleService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        try {
            // Kiểm tra username đã tồn tại
            if (userService.findByUsername(request.getUsername()) != null) {
                return ResponseEntity.badRequest()
                    .body(new AuthResponse("Username đã tồn tại!", false));
            }

            // Tạo user mới
            User user = new User();
            user.setUsername(request.getUsername());
            user.setEmail(request.getEmail());
            user.setPassword(request.getPassword()); // UserService sẽ mã hóa
            user.setFullName(request.getFullName());
            user.setPhone(request.getPhone());

            // Gán role mặc định
            Role userRole = roleService.findByName("ROLE_USER");
            if (userRole == null) {
                roleService.initializeDefaultRoles();
                userRole = roleService.findByName("ROLE_USER");
            }
            
            Set<Role> roles = new HashSet<>();
            roles.add(userRole);
            user.setRoles(roles);

            // Lưu user
            User savedUser = userService.saveUser(user);
            savedUser.setPassword(null); // Không trả về password

            return ResponseEntity.ok(
                new AuthResponse("Đăng ký thành công!", savedUser, true)
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponse("Lỗi: " + e.getMessage(), false));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.findByUsername(request.getUsername());
            
            if (user == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Username không tồn tại!", false));
            }

            // Kiểm tra password
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse("Mật khẩu không đúng!", false));
            }

            user.setPassword(null); // Không trả về password
            
            AuthResponse response = new AuthResponse("Đăng nhập thành công!", user, true);
            
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new AuthResponse("Lỗi: " + e.getMessage(), false));
        }
    }

    @GetMapping("/check")
    public ResponseEntity<AuthResponse> checkAuth() {
        return ResponseEntity.ok(
            new AuthResponse("Auth endpoint is working!", true)
        );
    }
}
