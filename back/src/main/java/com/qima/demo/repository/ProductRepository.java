package com.qima.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.qima.demo.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "SELECT p FROM Product p WHERE p.name LIKE %?1% OR p.description LIKE %?1%")
    List<Product> filter(String term);

    List<Product> findByCategory(long categoria);
}
