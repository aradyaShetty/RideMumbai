package com.ridemumbai.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"neighbors"}) // <-- ADD THIS LINE
public class StationNode {
    private String name;
    private List<Edge> neighbors; // List of connections to other stations

    public StationNode(String name) {
        this.name = name;
        this.neighbors = new ArrayList<>();
    }
}