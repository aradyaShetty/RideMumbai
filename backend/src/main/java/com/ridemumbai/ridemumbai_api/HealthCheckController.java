package com.ridemumbai.ridemumbai_api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @GetMapping("/api/health")
    public String healthCheck() {
        return "RideMumbai API is running!";
    }
}
