package com.ridemumbai.repository;

import com.ridemumbai.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    // Find routes based on start/end stations (needed for planning)
    List<Route> findByStartStationNameAndEndStationName(String start, String end);
    List<Route> findByStartStationName(String start);
}