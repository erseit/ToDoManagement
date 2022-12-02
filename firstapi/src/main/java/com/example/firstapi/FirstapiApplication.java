package com.example.firstapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
// makes class eligible to handle HTTP requests
@RestController
public class FirstapiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FirstapiApplication.class, args);
	}

}
