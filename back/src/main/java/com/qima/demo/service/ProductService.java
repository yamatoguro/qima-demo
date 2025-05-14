package com.qima.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.qima.demo.model.Product;
import com.qima.demo.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public Product newProduct(Product p) {
        return repository.save(p);
    }

    public Product updateProduct(long id, Product p) {
        Product p0 = repository.findById(id).get();
        p0.setId_product(p.getId_product());
        p0.setName(p.getName());
        p0.setPrice(p.getPrice());
        p0.setAvailable(p.getAvailable());
        p0.setDescription(p.getDescription());
        p0.setCategory(p.getCategory());
        return repository.save(p0);
    }

    public void deleteProduct(long id) {
        repository.deleteById(id);
    }

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findProduct(long id) {
        return repository.findById(id).get();
    }

    public Page<Product> findAllByCategory(long id, Pageable pageable) {
        return repository.findByCategory(id, pageable);
    }

    public List<Product> filterProducts(String termo) {
        return repository.filter(termo);
    }

    public Page<Product> filterProductsPaged(String termo, Pageable pageable) {
        return repository.filter(termo, pageable);
    }

    public Page<Product> findAllPaged(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
