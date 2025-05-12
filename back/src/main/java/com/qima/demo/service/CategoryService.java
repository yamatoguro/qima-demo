package com.qima.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qima.demo.model.Category;
import com.qima.demo.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public Category newCategory(String name) {
        Category c0 = new Category(name);
        return repository.save(c0);
    }

    public Category updateCategory(Category c) {
        return repository.save(c);
    }

    public void deleteCategory(long id) {
        repository.deleteById(id);
    }

    public List<Category> findAll() {
        return repository.findAll();
    }

    public Category findCategory(long id) {
        return repository.findById(id).get();
    }
}
