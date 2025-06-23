package com.restaurant.management.config;

import com.restaurant.management.model.ERole;
import com.restaurant.management.model.Role;
import com.restaurant.management.model.User;
import com.restaurant.management.repository.RoleRepository;
import com.restaurant.management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        Role adminRole = null, managerRole = null, staffRole = null;

        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            adminRole = roleRepository.save(new Role(ERole.ROLE_ADMIN));
        } else {
            adminRole = roleRepository.findByName(ERole.ROLE_ADMIN).get();
        }

        if (roleRepository.findByName(ERole.ROLE_MANAGER).isEmpty()) {
            managerRole = roleRepository.save(new Role(ERole.ROLE_MANAGER));
        } else {
            managerRole = roleRepository.findByName(ERole.ROLE_MANAGER).get();
        }

        if (roleRepository.findByName(ERole.ROLE_STAFF).isEmpty()) {
            staffRole = roleRepository.save(new Role(ERole.ROLE_STAFF));
        } else {
            staffRole = roleRepository.findByName(ERole.ROLE_STAFF).get();
        }

        // Create demo users if they don't exist
        createDemoUserIfNotExists("admin@restaurant.com", "Admin User", adminRole);
        createDemoUserIfNotExists("manager@restaurant.com", "Manager User", managerRole);
        createDemoUserIfNotExists("staff@restaurant.com", "Staff User", staffRole);
    }

    private void createDemoUserIfNotExists(String email, String fullName, Role role) {
        if (!userRepository.existsByEmail(email)) {
            User user = new User(fullName, email, passwordEncoder.encode("password123"));
            Set<Role> roles = new HashSet<>();
            roles.add(role);
            user.setRoles(roles);
            userRepository.save(user);
            System.out.println("Created demo user: " + email + " with password: password123");
        }
    }
}