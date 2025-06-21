package com.restaurant.management.config;

import com.restaurant.management.model.ERole;
import com.restaurant.management.model.Role;
import com.restaurant.management.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles if they don't exist
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_ADMIN));
        }
        if (roleRepository.findByName(ERole.ROLE_MANAGER).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_MANAGER));
        }
        if (roleRepository.findByName(ERole.ROLE_STAFF).isEmpty()) {
            roleRepository.save(new Role(ERole.ROLE_STAFF));
        }
    }
}