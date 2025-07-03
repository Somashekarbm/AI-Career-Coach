package com.aicareercoach.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aicareercoach.config.JwtUtil;
import com.aicareercoach.domain.User;
import com.aicareercoach.dto.AuthRequest;
import com.aicareercoach.dto.AuthResponse;
import com.aicareercoach.dto.LoginRequest;
import com.aicareercoach.dto.RefreshTokenRequest;
import com.aicareercoach.service.UserService;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;

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
        String refreshToken = jwtUtil.generateRefreshToken(saved.getId(), saved.getEmail());
        return ResponseEntity.ok(new AuthResponse(token, refreshToken, saved.getId(), saved.getEmail(), saved.getFirstName(), saved.getLastName()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.authenticateUser(request.getEmail(), request.getPassword());
            
            if (user == null) {
                return ResponseEntity.badRequest()
                    .body("Invalid email or password");
            }
            
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getId(), user.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, refreshToken, user.getId(), user.getEmail(), user.getFirstName(), user.getLastName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        try {
            String refreshToken = request.getRefreshToken();
            
            // Validate refresh token
            if (!jwtUtil.validateToken(refreshToken) || 
                !"refresh".equals(jwtUtil.getTokenType(refreshToken)) ||
                jwtUtil.isTokenExpired(refreshToken)) {
                return ResponseEntity.badRequest().body("Invalid or expired refresh token");
            }
            
            // Extract user info from refresh token
            String userId = jwtUtil.getUserIdFromToken(refreshToken);
            String email = jwtUtil.getEmailFromToken(refreshToken);
            
            // Generate new access token
            String newToken = jwtUtil.generateToken(userId, email);
            String newRefreshToken = jwtUtil.generateRefreshToken(userId, email);
            
            return ResponseEntity.ok(new AuthResponse(newToken, newRefreshToken, userId, email, "", ""));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Token refresh failed: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // In a stateless JWT system, logout is handled client-side
        // But we can add token blacklisting here if needed
        return ResponseEntity.ok().body("Logged out successfully");
    }

    // Debug endpoint to list all users (for development only)
    @GetMapping("/debug/users")
    public ResponseEntity<?> debugUsers() {
        try {
            return ResponseEntity.ok(userService.getAllUsersDebug());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        try {
            String idToken = body.get("idToken");
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String email = decodedToken.getEmail();
            String firstName = (String) decodedToken.getClaims().getOrDefault("name", "");
            String lastName = ""; // Firebase token may not have last name separately
            // Only allow login if user exists
            Optional<User> userOpt = userService.getUserByEmail(email);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("User not registered. Please register first.");
            }
            User user = userOpt.get();
            String token = jwtUtil.generateToken(user.getId(), user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getId(), user.getEmail());
            return ResponseEntity.ok(new AuthResponse(token, refreshToken, user.getId(), user.getEmail(), user.getFirstName(), user.getLastName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Google login failed: " + e.getMessage());
        }
    }

    @PostMapping("/google-register")
    public ResponseEntity<?> googleRegister(@RequestBody Map<String, Object> body) {
        try {
            String idToken = (String) body.get("idToken");
            String firstName = (String) body.get("firstName");
            String lastName = (String) body.get("lastName");
            
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
            String email = decodedToken.getEmail();
            
            // Check if user already exists
            Optional<User> existingUser = userService.getUserByEmail(email);
            if (existingUser.isPresent()) {
                return ResponseEntity.badRequest().body("User already exists. Please login instead.");
            }
            
            // Create new user
            User user = new User();
            user.setEmail(email);
            user.setFirstName(firstName != null ? firstName : "");
            user.setLastName(lastName != null ? lastName : "");
            user.setPassword(""); // No password for Google users
            // Set username as email prefix
            String username = email != null ? email.split("@")[0] : "googleuser";
            user.setUsername(username);
            
            User savedUser = userService.registerUser(user);
            String token = jwtUtil.generateToken(savedUser.getId(), savedUser.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(savedUser.getId(), savedUser.getEmail());
            
            return ResponseEntity.ok(new AuthResponse(token, refreshToken, savedUser.getId(), savedUser.getEmail(), savedUser.getFirstName(), savedUser.getLastName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Google registration failed: " + e.getMessage());
        }
    }
} 