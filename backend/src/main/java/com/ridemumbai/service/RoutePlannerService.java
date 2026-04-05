package com.ridemumbai.service;

import com.ridemumbai.model.Edge;
import com.ridemumbai.model.Route;
import com.ridemumbai.model.Station;
import com.ridemumbai.model.StationNode;
import com.ridemumbai.repository.RouteRepository;
import com.ridemumbai.repository.StationRepository;
import jakarta.annotation.PostConstruct; // For initializing data on startup
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j; // For logging
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j // Lombok annotation for logging
public class RoutePlannerService {

    private final StationRepository stationRepository;
    private final RouteRepository routeRepository;
    // ScheduleRepository might be needed later for time estimates

    // --- Mock Data Representation ---
    // We'll represent the network as an adjacency list: Map<StationName,
    // List<NeighborInfo>>
    // NeighborInfo could be a simple class/record holding neighbor name and travel
    // time/distance.
    // For now, let's just store direct routes from the RouteRepository.

    // TODO: In a real app, load this from DB/Config. For now, we use
    // RouteRepository directly.
    // private Map<String, List<Route>> adjacencyList = new HashMap<>();

    // Central graph representation: Map Station Name to Node object
    private Map<String, StationNode> metroGraph = new HashMap<>();

    // @PostConstruct remains the same...

    // --- Core Route Planning Logic (Full Dijkstra's Algorithm) ---

    @PostConstruct
    private void buildGraph() {
        log.info("Building the in-memory Metro Graph...");
        // 1. Clear previous graph and load all stations
        metroGraph.clear();
        List<Station> stations = stationRepository.findAll();
        stations.forEach(station -> metroGraph.put(station.getName(), new StationNode(station.getName())));

        // 2. Load all direct routes and build edges
        List<Route> routes = routeRepository.findAll();
        routes.forEach(route -> {
            StationNode source = metroGraph.get(route.getStartStationName());
            StationNode destination = metroGraph.get(route.getEndStationName());

            if (source != null && destination != null) {
                // Add edge to the source station's neighbor list
                source.getNeighbors().add(new Edge(destination, route.getDistance()));
            }
        });
        log.info("Metro Graph built with {} stations and {} edges.", metroGraph.size(), routes.size());
    }

    @PostConstruct // Runs after the bean is created - good place for initialization
    private void initializeMockData() {
        log.info("Initializing mock metro network data...");
        // TODO: In a real system, we might load complex graph data here.
        // For now, we rely on the routes fetched directly by RouteRepository.
        // We could pre-populate the DB here if needed, but ddl-auto=update handles it.
        log.info("Mock data initialization complete (using routes from DB).");
    }

    // --- Core Route Planning Logic (Placeholder) ---

    public boolean validateStations(String source, String destination) {
        log.info("Validating stations: {} to {}", source, destination);
        boolean sourceExists = stationRepository.existsByName(source);
        boolean destExists = stationRepository.existsByName(destination);
        log.info("Source exists: {}, Destination exists: {}", sourceExists, destExists);
        return sourceExists && destExists;
    }

    public Optional<Route> findFastestRoute(String sourceName, String destinationName) {
        // Re-build graph just in case data changed (can optimize this in production)
        buildGraph();

        if (!validateStations(sourceName, destinationName)) {
            return Optional.empty();
        }

        // Dijkstra's Algorithm Implementation
        Map<StationNode, Double> distances = new HashMap<>();
        Map<StationNode, StationNode> previousNodes = new HashMap<>();
        PriorityQueue<StationNode> priorityQueue = new PriorityQueue<>(Comparator.comparingDouble(distances::get));

        StationNode source = metroGraph.get(sourceName);
        StationNode destination = metroGraph.get(destinationName);

        if (source == null || destination == null)
            return Optional.empty();

        distances.put(source, 0.0);
        priorityQueue.add(source);

        // Initialize all other distances to infinity
        metroGraph.values().stream()
                .filter(node -> !node.equals(source))
                .forEach(node -> distances.put(node, Double.MAX_VALUE));

        while (!priorityQueue.isEmpty()) {
            StationNode current = priorityQueue.poll();

            // Stop if we found the destination
            if (current.equals(destination))
                break;

            // Iterate over neighbors (edges)
            for (Edge edge : current.getNeighbors()) {
                StationNode neighbor = edge.getDestination();
                double newDist = distances.get(current) + edge.getWeight();

                if (newDist < distances.getOrDefault(neighbor, Double.MAX_VALUE)) {
                    distances.put(neighbor, newDist);
                    previousNodes.put(neighbor, current);

                    // Re-add or update neighbor in the queue
                    // Standard Dijkstra implementations use update methods; this simplifies it
                    if (priorityQueue.contains(neighbor)) {
                        priorityQueue.remove(neighbor);
                    }
                    priorityQueue.add(neighbor);
                }
            }
        }

        // 3. Reconstruct the shortest path
        if (distances.get(destination) == Double.MAX_VALUE || distances.get(destination) == null) {
            log.warn("No route found between {} and {}", sourceName, destinationName);
            return Optional.empty();
        }

        LinkedList<String> path = new LinkedList<>();
        StationNode step = destination;
        while (step != null) {
            path.addFirst(step.getName());
            step = previousNodes.get(step);
        }

        log.info("Shortest Path Found: {} with total distance: {}", path, distances.get(destination));

        // 4. Return the constructed Route object representing the full journey
        // Note: This consolidates the entire path into one Route object for simplicity.
        return Optional.of(Route.builder()
                .startStationName(sourceName)
                .endStationName(destinationName)
                .distance(distances.get(destination))
                // In a production app, the list of stops/transfers would be stored here
                .routeId(-1L) // Mock ID for a dynamic route
                .build());
    }

    // --- Helper Methods (Placeholder, Matches Sequence Diagram) ---
    public List<String> getStationList() {
        log.info("Fetching full station list from database");
        // Fetch all stations from the repository, map them to their names, and collect
        // as a list
        return stationRepository.findAll().stream()
                .map(Station::getName) // Assumes you have 'import com.ridemumbai.model.Station;'
                .toList();
    }

    public List<Route> findAlternativeRoutes(String source, String destination) {
        log.info("Finding alternative routes (placeholder) from {} to {}", source, destination);
        // TODO: Implement logic to find routes other than the absolute fastest
        return Collections.emptyList(); // Not implemented yet
    }

    public Double calculateFare(Route route) {
        log.info("Calculating fare (placeholder) for route ID: {}", route.getRouteId());
        // TODO: Implement fare calculation logic based on distance, station zones, etc.
        return route.getDistance() != null ? route.getDistance() * 2.5 : 20.0; // Example: distance * rate or flat fee
    }

    public List<String> getTransferPoints(Route route) {
        log.info("Getting transfer points (placeholder) for route ID: {}", route.getRouteId());
        // TODO: Implement logic to identify transfer stations within a complex
        // calculated route
        return Collections.emptyList(); // Not implemented yet
    }
}