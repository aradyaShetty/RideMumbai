package com.ridemumbai.service;

import com.ridemumbai.model.Commuter;
import com.ridemumbai.model.User;
import com.ridemumbai.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    // Implements the "addToWallet" function from the Class Diagram (Commuter class)
    @Transactional
    public Commuter addToWallet(String username, Double amount) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        if (!(user instanceof Commuter)) {
            log.error("User {} is not a commuter.", username);
            throw new IllegalStateException("Only commuters have a wallet.");
        }

        Commuter commuter = (Commuter) user;
        Double currentBalance = commuter.getWalletBalance() != null ? commuter.getWalletBalance() : 0.0;
        
        // Simple logic for adding funds
        Double newBalance = currentBalance + amount;

        commuter.setWalletBalance(newBalance);
        userRepository.save(commuter);

        log.info("Commuter {} added {} to wallet. New balance: {}", username, amount, newBalance);
        return commuter;
    }
}