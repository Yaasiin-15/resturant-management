package com.restaurant.management.config;

import com.restaurant.management.model.ERole;
import com.restaurant.management.model.Role;
import com.restaurant.management.model.User;
import com.restaurant.management.repository.RoleRepository;
import com.restaurant.management.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        try {
            logger.info("Starting data initialization...");
            
            // Initialize roles if they don't exist
            Role adminRole = initializeRole(ERole.ROLE_ADMIN);
            Role managerRole = initializeRole(ERole.ROLE_MANAGER);
            Role staffRole = initializeRole(ERole.ROLE_STAFF);

            // Create demo users if they don't exist
            createDemoUserIfNotExists("admin@restaurant.com", "Admin User", adminRole);
            createDemoUserIfNotExists("manager@restaurant.com", "Manager User", managerRole);
            createDemoUserIfNotExists("staff@restaurant.com", "Staff User", staffRole);
            
            logger.info("Data initialization completed successfully");
        } catch (Exception e) {
            logger.error("Error during data initialization: ", e);
            throw e;
        }
    }

    private Role initializeRole(ERole roleEnum) {
        try {
            return roleRepository.findByName(roleEnum)
                    .orElseGet(() -> {
                        logger.info("Creating role: {}", roleEnum);
                        Role newRole = new Role(roleEnum);
                        return roleRepository.save(newRole);
                    });
        } catch (Exception e) {
            logger.error("Error initializing role {}: ", roleEnum, e);
            throw e;
        }
    }

    private void createDemoUserIfNotExists(String email, String fullName, Role role) {
        try {
            if (!userRepository.existsByEmail(email)) {
                logger.info("Creating demo user: {}", email);
                
                User user = new User(fullName, email, passwordEncoder.encode("password123"));
                Set<Role> roles = new HashSet<>();
                roles.add(role);
                user.setRoles(roles);
                
                userRepository.save(user);
                logger.info("Created demo user: {} with password: password123", email);
            } else {
                logger.info("Demo user already exists: {}", email);
            }
        } catch (Exception e) {
            logger.error("Error creating demo user {}: ", email, e);
            throw e;
        }
    }
}