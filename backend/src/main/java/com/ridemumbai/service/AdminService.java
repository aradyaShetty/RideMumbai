package com.ridemumbai.service;

import com.ridemumbai.dto.*; // Import DTOs
import com.ridemumbai.model.*; // Import Models
import com.ridemumbai.repository.*; // Import Repositories
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.time.format.DateTimeParseException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminService {

    private final UserRepository userRepository;
    private final StationRepository stationRepository;
    private final RouteRepository routeRepository;
    private final ScheduleRepository scheduleRepository;

    // --- User Management ---
    public List<User> getAllUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    // --- Station Management ---
    @Transactional
    public Station createStation(StationRequest request) {
        if (stationRepository.existsByName(request.getName())) {
            throw new IllegalArgumentException("Station with name " + request.getName() + " already exists.");
        }
        Station station = Station.builder().name(request.getName()).build();
        log.info("Creating new station: {}", request.getName());
        return stationRepository.save(station);
    }

    // Add updateStation and deleteStation methods if needed

    // --- Route Management ---
    @Transactional
    public Route createRoute(RouteRequest request) {
        // Validate stations exist
        if (!stationRepository.existsByName(request.getStartStationName()) ||
            !stationRepository.existsByName(request.getEndStationName())) {
            throw new IllegalArgumentException("Start or End station does not exist.");
        }
        Route route = Route.builder()
                .startStationName(request.getStartStationName())
                .endStationName(request.getEndStationName())
                .distance(request.getDistance())
                .build();
        log.info("Creating new route: {} -> {}", route.getStartStationName(), route.getEndStationName());
        return routeRepository.save(route);
    }

    // Add updateRoute and deleteRoute methods if needed

    // --- Schedule Management ---
    @Transactional
    public Schedule createSchedule(ScheduleRequest request) {
        Route route = routeRepository.findById(request.getRouteId())
                .orElseThrow(() -> new IllegalArgumentException("Route with ID " + request.getRouteId() + " not found."));

        LocalTime departure;
        LocalTime arrival;
        try {
            departure = LocalTime.parse(request.getDepartureTime()); // Assumes HH:mm or HH:mm:ss format
            arrival = LocalTime.parse(request.getArrivalTime());
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid time format. Use HH:mm or HH:mm:ss.", e);
        }

        Schedule schedule = Schedule.builder()
                .routeId(route.getRouteId())
                .departureTime(departure)
                .arrivalTime(arrival)
                .frequency(request.getFrequency())
                .build();
        log.info("Creating new schedule for route ID: {}", route.getRouteId());
        return scheduleRepository.save(schedule);
    }

    // Add updateSchedule and deleteSchedule methods if needed
}