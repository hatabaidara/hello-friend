package com.tonsite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Read allowed origins from environment variable (comma-separated).
        // Examples:
        // - CORS_ALLOWED_ORIGINS=https://app.example.com,https://admin.example.com
        // - CORS_ALLOWED_ORIGINS=*  -> allow all origins
        String env = System.getenv("CORS_ALLOWED_ORIGINS");

        if (env == null || env.isBlank()) {
            // sensible development defaults
            config.setAllowedOrigins(List.of(
                    "http://localhost:5173",
                    "http://localhost:8080",
                    "http://localhost:3000"
            ));
        } else if (env.trim().equals("*")) {
            // Allow any origin (use with caution in production)
            config.addAllowedOriginPattern("*");
        } else {
            List<String> origins = Arrays.stream(env.split(","))
                    .map(String::trim)
                    .filter(s -> !s.isEmpty())
                    .collect(Collectors.toList());

            // If any origin contains a wildcard pattern, use allowed origin patterns
            boolean hasPattern = origins.stream().anyMatch(s -> s.contains("*") || s.contains("?"));
            if (hasPattern) {
                config.setAllowedOriginPatterns(origins);
            } else {
                config.setAllowedOrigins(origins);
            }
        }

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
