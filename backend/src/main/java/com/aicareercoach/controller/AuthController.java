package com.aicareercoach.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicareercoach.config.JwtUtil;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.AuthRequest;
import com.aicareercoach.dto.AuthResponse;
import com.aicareercoach.dto.LoginRequest;
import com.aicareercoach.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;


    

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody AuthRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        User saved = userService.registerUser(user);
        String token = jwtUtil.generateToken(saved.getId(), saved.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, saved.getId(), saved.getEmail(), saved.getFirstName(), saved.getLastName()));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        User user = userService.authenticateUser(request.getEmail(), request.getPassword());
        String token = jwtUtil.generateToken(user.getId(), user.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, user.getId(), user.getEmail(), user.getFirstName(), user.getLastName()));
    }
} 