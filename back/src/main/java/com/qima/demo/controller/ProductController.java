package com.qima.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qima.demo.model.Product;
import com.qima.demo.service.ProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping(path = "/product", produces = "application/json")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public Product getProduct(@PathVariable Long id) {
        return service.findProduct(id);
    }

    @GetMapping("")
    public List<Product> findAllProducts() {
        return service.findAll();
    }

    @GetMapping("/search")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Product> getFilteredProducts(@RequestParam(name = "term", required = true) String term) {
        return service.filterProducts(term);
    }

    @PostMapping("")
    @ResponseStatus(value = HttpStatus.CREATED)
    public void newProduto(@RequestParam String name, @RequestParam double price, @RequestParam int available,
            @RequestParam String description, @RequestParam long category) {
        Product p = new Product(0, name, price, available, description, category);
        service.newProduct(p);
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Product updateProduto(@PathVariable long id, @RequestParam String name, @RequestParam double price,
            @RequestParam int available, @RequestParam String description, @RequestParam long category) {
        Product p = new Product(id, name, price, available, description, category);
        return service.updateProduct(id, p);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteProduto(@PathVariable long id) {
        service.deleteProduct(id);
    }
}
