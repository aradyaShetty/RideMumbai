package com.ridemumbai.dto; 

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookTicketRequest {
    // private Long routeId; // <-- REMOVED
    private String startStationName; // <-- ADDED
    private String endStationName;   // <-- ADDED
    private Double distance;         // <-- ADDED

    private String ticketType;
    private String paymentMethod;
}