package com.ridemumbai.repository;

import com.ridemumbai.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByTicketId(Long ticketId);
    // Add other find methods if needed, e.g., findByTransactionId
}