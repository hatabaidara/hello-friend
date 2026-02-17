package com.tonsite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HelloFriendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HelloFriendApplication.class, args);
    }
}
