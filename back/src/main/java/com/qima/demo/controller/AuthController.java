package com.qima.demo.controller;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qima.demo.model.Role;
import com.qima.demo.model.User;
import com.qima.demo.model.dto.AuthResponse;
import com.qima.demo.model.dto.LoginRequest;
import com.qima.demo.model.dto.RegisterRequest;
import com.qima.demo.repository.RoleRepository;
import com.qima.demo.repository.UserRepository;
import com.qima.demo.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

        @Autowired
        private UserRepository userRepo;

        @Autowired
        private RoleRepository roleRepo;

        @Autowired
        private AuthenticationManager authManager;

        @Autowired
        private JwtUtil jwtUtil;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @PostMapping("/register")
        public ResponseEntity<String> register(@RequestBody RegisterRequest request) {

                if (userRepo.findByUsername(request.getUsername()).isPresent()) {
                        return ResponseEntity.badRequest().body("Username is already in use.");
                }

                Set<Role> userRoles = request.getRoles().stream()
                                .map(roleName -> roleRepo.findByName(roleName)
                                                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName)))
                                .collect(Collectors.toSet());

                User newUser = new User();
                newUser.setName(request.getName());
                newUser.setUsername(request.getUsername());
                newUser.setPassword(passwordEncoder.encode(request.getPassword()));
                newUser.setRoles(userRoles);

                userRepo.save(newUser);
                return ResponseEntity.ok("User Registered Successfully");
        }

        @PostMapping("/login")
        public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
                authManager.authenticate(new UsernamePasswordAuthenticationToken(
                                request.getUsername(), request.getPassword()));

                UserDetails userDetails = userRepo.findByUsername(request.getUsername())
                                .map(user -> new org.springframework.security.core.userdetails.User(
                                                user.getUsername(), user.getPassword(),
                                                user.getRoles().stream()
                                                                .map(role -> new SimpleGrantedAuthority(role.getName()))
                                                                .collect(Collectors.toList())))
                                .orElseThrow();

                String jwt = jwtUtil.generateToken(userDetails);
                return ResponseEntity.ok(new AuthResponse("User Logged in Successfully! ", jwt));

        }
}
