package com.qima.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.qima.demo.model.Category;
import com.qima.demo.service.CategoryService;

@RestController
@RequestMapping(path = "/category", produces = "application/json")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping("")
    @ResponseStatus(value = HttpStatus.OK)
    public List<Category> getCategories() {
        return service.findAll();
    }

    @PostMapping()
    @ResponseStatus(value = HttpStatus.CREATED)
    public void newCategory(@RequestParam String name) {
        service.newCategory(name);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteCategory(@PathVariable long id) {
        service.deleteCategory(id);
    }
}
