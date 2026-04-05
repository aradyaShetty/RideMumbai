package com.ridemumbai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime; // Use LocalDateTime for date and time

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ticketId;

    // Link to the user (Commuter) who booked the ticket
    @Column(nullable = false)
    private Long commuterId; // Or use @ManyToOne User commuter;

    // Link to the route this ticket is for
    @Column(nullable = false)
    private Long routeId; // Or use @ManyToOne Route route;

    @Column(nullable = false)
    private Double fare;

    @Column(nullable = false)
    private LocalDateTime bookingDateTime;

    @Column(nullable = false)
    private String ticketType; // e.g., "SINGLE", "RETURN", "MULTI_RIDE"

    private String qrCodeData; // Store the data to be encoded in QR code

    @Column(nullable = false)
    private String status; // e.g., "BOOKED", "USED", "CANCELLED", "EXPIRED"

    // Methods like generateQRCode, validateQRCode, cancelTicket belong in Service layer
}