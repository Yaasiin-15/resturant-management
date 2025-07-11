package com.restaurant.management.controller;

import com.restaurant.management.model.ERole;
import com.restaurant.management.model.Role;
import com.restaurant.management.model.User;
import com.restaurant.management.payload.request.LoginRequest;
import com.restaurant.management.payload.request.SignupRequest;
import com.restaurant.management.payload.response.JwtResponse;
import com.restaurant.management.payload.response.MessageResponse;
import com.restaurant.management.repository.RoleRepository;
import com.restaurant.management.repository.UserRepository;
import com.restaurant.management.security.JwtUtils;
import com.restaurant.management.security.UserDetailsImpl;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"}, maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            logger.info("Authentication attempt for user: {}", loginRequest.getEmail());
            
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            logger.info("User {} authenticated successfully with roles: {}", loginRequest.getEmail(), roles);

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    roles));
        } catch (AuthenticationException e) {
            logger.error("Authentication failed for user {}: {}", loginRequest.getEmail(), e.getMessage());
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Invalid email or password!"));
        } catch (Exception e) {
            logger.error("Unexpected error during authentication: ", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Authentication failed!"));
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        try {
            logger.info("Registration attempt for user: {}", signUpRequest.getEmail());
            
            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                logger.warn("Registration failed - email already exists: {}", signUpRequest.getEmail());
                return ResponseEntity.badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }

            // Create new user's account
            User user = new User(signUpRequest.getFullName(),
                    signUpRequest.getEmail(),
                    encoder.encode(signUpRequest.getPassword()));

            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null || strRoles.isEmpty()) {
                Role userRole = roleRepository.findByName(ERole.ROLE_STAFF)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role.toLowerCase()) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);
                            break;
                        case "manager":
                            Role managerRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(managerRole);
                            break;
                        default:
                            Role userRole = roleRepository.findByName(ERole.ROLE_STAFF)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);
                    }
                });
            }

            user.setRoles(roles);
            userRepository.save(user);
            
            logger.info("User {} registered successfully with roles: {}", signUpRequest.getEmail(), 
                    roles.stream().map(r -> r.getName().toString()).collect(Collectors.toList()));

            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
        } catch (Exception e) {
            logger.error("Error during user registration: ", e);
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error: Registration failed!"));
        }
    }
}