package com.qima.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
@Table(name = "category")
public class Category {

    public Category(String name) {
        this.name = name;
    }

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private @Getter @Setter @Column(name = "id_category") long id_category;
    private @Getter @Setter @Column(name = "name") String name;
}