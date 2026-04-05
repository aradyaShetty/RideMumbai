package com.ridemumbai.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"destination"}) // <-- ADD THIS LINE
public class Edge {
    private StationNode destination;
    private double weight; // Use distance as the weight for "fastest" route
}