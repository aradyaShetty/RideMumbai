package com.ridemumbai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "travel_history")
public class TravelHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;

    // Link to the user this history belongs to
    @Column(nullable = false)
    private Long commuterId; // Or @ManyToOne User commuter;

    // Link to the specific ticket used for the journey
    @Column(nullable = false)
    private Long ticketId; // Or @ManyToOne Ticket ticket;

    @Column(nullable = false)
    private LocalDateTime journeyDateTime; // When the journey was taken/ticket used

    // Could store simplified route info like start/end station names
    private String startStationName;
    private String endStationName;

    private Double farePaid;

    // Methods like addJourney, generateReport belong in Service layer
}