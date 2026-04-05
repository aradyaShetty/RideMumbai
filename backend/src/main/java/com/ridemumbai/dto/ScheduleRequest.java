package com.ridemumbai.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequest {
    private Long routeId;
    private String departureTime; // Use String for flexibility, parse in service
    private String arrivalTime;   // Use String for flexibility, parse in service
    private String frequency;
}