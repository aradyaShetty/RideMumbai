package com.ridemumbai.controller;

import com.ridemumbai.dto.*; // Import DTOs
import com.ridemumbai.model.*; // Import Models
import com.ridemumbai.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// Import PreAuthorize for method-level security
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin") // Base path for all admin endpoints
@RequiredArgsConstructor
// Optional: @PreAuthorize("hasRole('ADMIN')") // Apply security to the whole controller
public class AdminController {

    private final AdminService adminService;

    // --- User Endpoints ---
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')") // Only Admins can access
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // --- Station Endpoints ---
    @PostMapping("/stations")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Station> createStation(@RequestBody StationRequest request) {
        try {
            Station createdStation = adminService.createStation(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Simple error handling
        }
    }

    // --- Route Endpoints ---
    @PostMapping("/routes")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Route> createRoute(@RequestBody RouteRequest request) {
         try {
            Route createdRoute = adminService.createRoute(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRoute);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Simple error handling
        }
    }

    // --- Schedule Endpoints ---
    @PostMapping("/schedules")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Schedule> createSchedule(@RequestBody ScheduleRequest request) {
         try {
            Schedule createdSchedule = adminService.createSchedule(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null); // Simple error handling
        }
    }

    // Add GET, PUT, DELETE endpoints for stations, routes, schedules as needed
}