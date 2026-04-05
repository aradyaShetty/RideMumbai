package com.ridemumbai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    // Represent start/end stations by their names or IDs
    // Using simple names for now, matching RoutePlanner class attributes
    @Column(nullable = false)
    private String startStationName;

    @Column(nullable = false)
    private String endStationName;

    // Distance might be calculated or stored
    private Double distance;

    // Relationships (like Schedule) will be added later if needed based on queries
    // Example: @OneToMany mappedBy="route" private List<Schedule> schedules;

    // Methods like calculateFare, estimateTime belong in the Service layer
}