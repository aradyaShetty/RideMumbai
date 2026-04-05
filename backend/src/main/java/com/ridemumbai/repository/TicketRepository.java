package com.ridemumbai.repository;

import com.ridemumbai.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCommuterIdOrderByBookingDateTimeDesc(Long commuterId);
    // Add other find methods as needed, e.g., findByQrCodeData
}