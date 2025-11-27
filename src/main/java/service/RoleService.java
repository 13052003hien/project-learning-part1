package service;

import org.springframework.stereotype.Service;
import model.Role;
import repository.RoleRepository;

import java.util.Optional;

@Service
public class RoleService {
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role findByName(String name) {
        return roleRepository.findByName(name).orElse(null);
    }

    public Role createRole(String roleName) {
        if (!roleRepository.existsByName(roleName)) {
            Role role = new Role(roleName);
            return roleRepository.save(role);
        }
        return findByName(roleName);
    }

    public void initializeDefaultRoles() {
        createRole("ROLE_USER");
        createRole("ROLE_ADMIN");
    }
}
