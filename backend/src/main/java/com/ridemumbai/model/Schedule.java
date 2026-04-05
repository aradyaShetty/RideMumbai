package com.ridemumbai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime; // Use java.time for modern time handling

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "schedules")
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    // Link back to the Route this schedule is for (Many schedules to One Route)
    // Storing routeId directly for simplicity now
    @Column(nullable = false)
    private Long routeId; // Or use @ManyToOne if you prefer object relation

    @Column(nullable = false)
    private LocalTime departureTime;

    @Column(nullable = false)
    private LocalTime arrivalTime;

    // Frequency might be stored as text ("Every 10 mins") or Duration
    private String frequency;

    // Methods like getNextTrain, checkAvailability belong in the Service layer
}