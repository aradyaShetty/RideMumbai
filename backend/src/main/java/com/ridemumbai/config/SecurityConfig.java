package com.ridemumbai.config;

import lombok.RequiredArgsConstructor; // Add this import
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod; // <-- IMPORT THIS
import org.springframework.security.authentication.AuthenticationProvider; // Add this import
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter; // Add this import

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // Use Lombok constructor injection
@EnableMethodSecurity
public class SecurityConfig {

    // Inject the filter and provider beans
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Allow all OPTIONS requests (for CORS preflight)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // <-- ADD THIS LINE
                // Allow our public endpoints
                .requestMatchers("/api/health", "/api/auth/**").permitAll()
                // Allow authenticated users to get their details
                .requestMatchers("/api/users/me").authenticated() // <-- ADD THIS LINE
                // Only users with ROLE_COMMUTER can access commuter routes
                .requestMatchers("/api/commuter/**").hasRole("COMMUTER")
                // Secure all admin endpoints
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                // Secure all other endpoints
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Configure the authentication provider
            .authenticationProvider(authenticationProvider)
            // Add the JWT filter before the standard username/password filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}