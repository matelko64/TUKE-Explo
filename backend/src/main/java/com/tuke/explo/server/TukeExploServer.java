package com.tuke.explo.server;

import com.tuke.explo.service.UserService;
import com.tuke.explo.service.UserServiceJPA;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@EntityScan(basePackages = "com.tuke.explo.entity")
public class TukeExploServer {

    public static void main(String[] args) {
        SpringApplication.run(TukeExploServer.class);
    }
    @Bean
    public UserService userService(){
        return new UserServiceJPA();
    }
}
