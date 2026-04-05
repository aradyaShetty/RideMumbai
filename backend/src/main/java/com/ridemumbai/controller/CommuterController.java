package com.ridemumbai.controller;

import com.ridemumbai.model.Commuter;
import com.ridemumbai.model.TravelHistory;
import com.ridemumbai.model.Ticket;
import com.ridemumbai.service.TicketService;
import com.ridemumbai.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/commuter")
@RequiredArgsConstructor
public class CommuterController {

    private final TicketService ticketService;
    private final UserService userService; // Defined in the next step

    // Endpoint for Commuter's "Travel History" feature
    @GetMapping("/history")
    public ResponseEntity<List<TravelHistory>> getTravelHistory(Authentication authentication) {
        List<TravelHistory> history = ticketService.getTravelHistory(authentication.getName());
        return ResponseEntity.ok(history);
    }

    // Endpoint for Commuter's "Ticket View"
    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getCurrentTickets(Authentication authentication) {
        List<Ticket> tickets = ticketService.getUserTickets(authentication.getName());
        return ResponseEntity.ok(tickets);
    }

    // Endpoint for the "Cancel Ticket" feature
    @PostMapping("/tickets/{ticketId}/cancel")
    public ResponseEntity<String> cancelTicket(@PathVariable Long ticketId, Authentication authentication) {
        boolean success = ticketService.cancelTicket(ticketId, authentication.getName());
        if (success) {
            return ResponseEntity.ok("Ticket " + ticketId + " successfully cancelled and refunded.");
        }
        return ResponseEntity.badRequest().body("Cancellation failed. Check ticket status or ownership.");
    }

    // Endpoint for Commuter's "Add to Wallet" feature
    @PostMapping("/wallet/add")
    public ResponseEntity<Commuter> addToWallet(Authentication authentication, @RequestParam Double amount) {
        Commuter commuter = userService.addToWallet(authentication.getName(), amount);
        return ResponseEntity.ok(commuter);
    }
}