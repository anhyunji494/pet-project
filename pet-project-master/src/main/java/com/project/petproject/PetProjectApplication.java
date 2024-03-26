package com.project.petproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class PetProjectApplication {

  public static void main(String[] args) {
    SpringApplication.run(PetProjectApplication.class, args);
  }
}
