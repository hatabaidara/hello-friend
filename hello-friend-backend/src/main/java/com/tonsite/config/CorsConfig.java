package com.tonsite.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // Hardcoded allowed origins (includes local dev, preview, and production frontend)
        // DO NOT set '*' here for production; list explicit origins.
        List<String> origins = List.of(
                "http://localhost:5173",
                "http://localhost:8080",
                "http://localhost:3000",
                "https://id-preview--1136a99f-0bac-4d54-923e-559e58a91f7f.lovable.app",
                "https://hello-friend-frontend.onrender.com",
                "https://www.votredomaine.com"
        );

        config.setAllowedOrigins(origins);
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
