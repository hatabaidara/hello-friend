package com.tonsite.config;

import com.tonsite.model.Member;
import com.tonsite.model.Role;
import com.tonsite.repository.MemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initAdmin(MemberRepository memberRepository,
                                       PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@generationoriginal.sn";
            if (memberRepository.findByEmail(adminEmail).isEmpty()) {
                Member admin = new Member();
                admin.setNom("Administrateur");
                admin.setEmail(adminEmail);
                admin.setMotDePasse(passwordEncoder.encode("Admin2024"));
                admin.setRole(Role.ADMIN);
                admin.setTelephone("");
                admin.setVille("Dakar");
                memberRepository.save(admin);
                System.out.println("Admin cree");
            }
        };
    }
}