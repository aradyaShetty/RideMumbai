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
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    // Link to the ticket this payment is associated with (OneToOne)
    @Column(nullable = false, unique = true) // One payment per ticket
    private Long ticketId; // Or use @OneToOne Ticket ticket;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private LocalDateTime paymentDateTime;

    @Column(nullable = false)
    private String paymentMethod; // e.g., "UPI", "CARD", "WALLET"

    @Column(nullable = false)
    private String status; // e.g., "PENDING", "SUCCESS", "FAILED"

    private String transactionId; // From payment gateway or internal reference

    // Methods like processPayment, refundPayment belong in Service layer
}