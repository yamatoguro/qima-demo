package com.qima.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id @GeneratedValue(strategy = GenerationType.AUTO) @Column(name = "id_product")
    private @Getter @Setter long id_product;
    private @Getter @Setter @Column(name = "name") String name;
    private @Getter @Setter @Column(name = "price") double price;
    private @Getter @Setter @Column(name = "available") int available;
    private @Getter @Setter @Column(name = "description") String description;
    private @Getter @Setter @Column(name = "category") long category;

}
