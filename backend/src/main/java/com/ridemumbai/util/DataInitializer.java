package com.ridemumbai.util;

import com.ridemumbai.model.*; // Import all models including Admin, Commuter
import com.ridemumbai.model.enums.Role; // Import Role enum
import com.ridemumbai.repository.*; // Import all repositories
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder
import org.springframework.stereotype.Component;
import java.util.Date; // Import Date for Admin's lastLogin
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final StationRepository stationRepository;
    private final RouteRepository routeRepository;
    private final UserRepository userRepository; // Inject UserRepository
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking if mock data needs to be initialized...");

        // Initialize Stations and Routes if empty
        if (stationRepository.count() == 0) {
            log.info("No existing station data found. Initializing mock stations and routes...");
            // --- Create Mock Stations ---
            Station andheri = Station.builder().name("Andheri").build();
            Station weh = Station.builder().name("WEH").build();
            Station chakala = Station.builder().name("Chakala").build();
            Station airport = Station.builder().name("Airport Road").build();
            Station marol = Station.builder().name("Marol Naka").build();
            Station saki = Station.builder().name("Saki Naka").build();
            Station asalpha = Station.builder().name("Asalpha").build();
            Station jagruti = Station.builder().name("Jagruti Nagar").build();
            Station ghatkopar = Station.builder().name("Ghatkopar").build();
            List<Station> stations = List.of(andheri, weh, chakala, airport, marol, saki, asalpha, jagruti, ghatkopar);
            stationRepository.saveAll(stations);
            log.info("Saved {} mock stations.", stations.size());

            // --- Create Mock Routes ---
            Route r1 = Route.builder().startStationName("Andheri").endStationName("WEH").distance(1.5).build();
            Route r2 = Route.builder().startStationName("WEH").endStationName("Andheri").distance(1.5).build();
            // ... (add all other routes R3 to R16 as defined in Task 4) ...
            Route r3 = Route.builder().startStationName("WEH").endStationName("Chakala").distance(1.0).build();
            Route r4 = Route.builder().startStationName("Chakala").endStationName("WEH").distance(1.0).build();
            Route r5 = Route.builder().startStationName("Chakala").endStationName("Airport Road").distance(0.8).build();
            Route r6 = Route.builder().startStationName("Airport Road").endStationName("Chakala").distance(0.8).build();
            Route r7 = Route.builder().startStationName("Airport Road").endStationName("Marol Naka").distance(0.7)
                    .build();
            Route r8 = Route.builder().startStationName("Marol Naka").endStationName("Airport Road").distance(0.7)
                    .build();
            Route r9 = Route.builder().startStationName("Marol Naka").endStationName("Saki Naka").distance(1.1).build();
            Route r10 = Route.builder().startStationName("Saki Naka").endStationName("Marol Naka").distance(1.1)
                    .build();
            Route r11 = Route.builder().startStationName("Saki Naka").endStationName("Asalpha").distance(1.2).build();
            Route r12 = Route.builder().startStationName("Asalpha").endStationName("Saki Naka").distance(1.2).build();
            Route r13 = Route.builder().startStationName("Asalpha").endStationName("Jagruti Nagar").distance(1.0)
                    .build();
            Route r14 = Route.builder().startStationName("Jagruti Nagar").endStationName("Asalpha").distance(1.0)
                    .build();
            Route r15 = Route.builder().startStationName("Jagruti Nagar").endStationName("Ghatkopar").distance(1.3)
                    .build();
            Route r16 = Route.builder().startStationName("Ghatkopar").endStationName("Jagruti Nagar").distance(1.3)
                    .build();
            List<Route> routes = List.of(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12, r13, r14, r15, r16);
            routeRepository.saveAll(routes);
            log.info("Saved {} mock routes.", routes.size());
        } else {
            log.info("Station/Route data already exists. Skipping initialization.");
        }

        // --- Initialize Users if none exist ---
        if (userRepository.count() == 0) {
            log.info("No existing user data found. Initializing mock Admin and Commuter users...");
            User admin = Admin.builder()
                    .username("admin@ridemumbai.com") // <-- USE EMAIL AS USERNAME
                    .email("admin@ridemumbai.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .adminLevel(1)
                    .department("Operations")
                    .lastLogin(new Date())
                    .build();

            Commuter initialCommuter = Commuter.builder()
                    .username("commuter1@ridemumbai.com") // <-- USE EMAIL AS USERNAME
                    .email("commuter1@ridemumbai.com")
                    .password(passwordEncoder.encode("password123"))
                    .role(Role.ROLE_COMMUTER)
                    .walletBalance(100.0)
                    .phoneNumber("9876543210")
                    .membershipType("STANDARD")
                    .build();

            userRepository.saveAll(List.of(admin, initialCommuter));
            log.info("Saved initial Admin and Commuter data.");
        } else {
            log.info("User data already exists. Skipping user initialization.");
        }
    }
}