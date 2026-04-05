package com.ridemumbai.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stations")
public class Station {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stationId;

    @Column(unique = true, nullable = false)
    private String name;

    // Add other relevant station details if needed, e.g., line color, accessibility info
    // We'll add relationships later if necessary (e.g., ManyToMany with Route)
}