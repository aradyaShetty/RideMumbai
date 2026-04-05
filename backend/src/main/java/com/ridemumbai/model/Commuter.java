package com.ridemumbai.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@EqualsAndHashCode(callSuper = true) // Use parent fields in equals/hashCode
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "commuters")
public class Commuter extends User {

    private Double walletBalance;
    private String phoneNumber;
    private String membershipType;

    // Note: Methods like 'addToWallet' belong in the Service layer, not the Entity.
}