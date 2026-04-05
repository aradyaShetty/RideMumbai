package com.ridemumbai.auth; // Or com.ridemumbai.dto

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookTicketRequest {
    private Long routeId;
    private String ticketType; // e.g., "SINGLE"
    private String paymentMethod; // e.g., "WALLET", "UPI"
    // Add quantity if needed
}