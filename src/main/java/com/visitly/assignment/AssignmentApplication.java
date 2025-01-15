package com.visitly.assignment;

import io.github.cdimascio.dotenv.Dotenv;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AssignmentApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		// Check if the variables are being loaded
		System.out.println(dotenv.get("SPRING_DATASOURCE_URL"));
		System.out.println(dotenv.get("SPRING_DATASOURCE_USERNAME"));
		System.out.println(dotenv.get("SPRING_DATASOURCE_PASSWORD"));

		SpringApplication.run(AssignmentApplication.class, args);
	}
}
