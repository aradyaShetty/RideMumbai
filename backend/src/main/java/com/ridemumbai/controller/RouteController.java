package com.ridemumbai.controller;

import com.ridemumbai.model.Route;
import com.ridemumbai.service.RoutePlannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
public class RouteController {

    private final RoutePlannerService routePlannerService;

    // Endpoint matching the sequence diagram's planRoute(source, destination)
    @GetMapping("/plan")
    public ResponseEntity<?> planRoute(
            @RequestParam String source,
            @RequestParam String destination) {

        Optional<Route> fastestRoute = routePlannerService.findFastestRoute(source, destination);

        if (fastestRoute.isPresent()) {
            // In a real app, return a more detailed DTO including fare, time, transfers
            return ResponseEntity.ok(fastestRoute.get());
        } else {
            // Use 404 Not Found if no route exists, or 400 Bad Request if stations were invalid
            // Service layer should ideally throw specific exceptions for invalid stations
            if (!routePlannerService.validateStations(source, destination)) {
                 return ResponseEntity.badRequest().body("Invalid source or destination station provided.");
            }
            return ResponseEntity.notFound().build(); // No route found
        }
    }

    // Optional: Endpoint to get all stations
    @GetMapping("/stations")
    public ResponseEntity<java.util.List<String>> getAllStations() {
        return ResponseEntity.ok(routePlannerService.getStationList());
    }
}