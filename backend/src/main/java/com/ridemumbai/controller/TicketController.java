package com.ridemumbai.controller;

import com.ridemumbai.dto.BookTicketRequest; // Adjust package if needed
import com.ridemumbai.model.Ticket;
import com.ridemumbai.service.TicketService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@Slf4j // <-- ADD THIS ANNOTATION
public class TicketController {

    private final TicketService ticketService;

    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody BookTicketRequest request) {
        try {
            Optional<Ticket> bookedTicket = ticketService.bookTicket(request); // Pass the whole request DTO

            if (bookedTicket.isPresent()) {
                return ResponseEntity.ok(bookedTicket.get()); // Return the created Ticket entity
            } else {
                // This will catch other errors, e.g., "User is not a Commuter"
                return ResponseEntity.badRequest().body("Ticket booking failed. Check route or user status.");
            }
        } catch (IllegalStateException e) {
            // Catch the "Insufficient wallet balance" exception from the service
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            // Catch any other unexpected error
            log.error("Unexpected error during ticket booking: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
    //  TODO: Add endpoints for getting user's tickets, cancelling tickets etc.
}