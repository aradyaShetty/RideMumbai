package com.ridemumbai.ridemumbai_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.ridemumbai")
@EnableJpaRepositories(basePackages = "com.ridemumbai.repository") // Add this line
@EntityScan(basePackages = "com.ridemumbai.model") // Add this line
public class RidemumbaiApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(RidemumbaiApiApplication.class, args);
	}

}
