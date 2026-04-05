package com.ridemumbai.repository;

import com.ridemumbai.model.TravelHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TravelHistoryRepository extends JpaRepository<TravelHistory, Long> {
    List<TravelHistory> findByCommuterIdOrderByJourneyDateTimeDesc(Long commuterId);
}