package com.ridemumbai.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    // private String username;
    private String name; // <-- ADD THIS
    private String email;
    private String password;
}