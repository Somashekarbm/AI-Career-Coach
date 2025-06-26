package com.aicareercoach.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for development
            .authorizeHttpRequests(authz -> authz
                // Allow H2 console
                .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()
                // Allow all API endpoints for now (development)
                .requestMatchers(new AntPathRequestMatcher("/api/v1/**")).permitAll()
                // Allow Swagger UI
                .requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
                .requestMatchers(new AntPathRequestMatcher("/api-docs/**")).permitAll()
                // Allow actuator endpoints
                .requestMatchers(new AntPathRequestMatcher("/actuator/**")).permitAll()
                // Allow all other requests for development
                .anyRequest().permitAll()
            )
            .headers(headers -> headers
            .frameOptions(frameOptions -> frameOptions.disable())); // Allow H2 console frames
        
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public String jwtSecretKey(@Value("${jwt.secret:mysecretkey1234567890}") String secret) {
        return secret;
    }
} 