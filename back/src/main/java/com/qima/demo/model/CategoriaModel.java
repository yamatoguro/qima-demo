package com.qima.demo.model;

import org.springframework.data.annotation.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class CategoriaModel {

    @Id
    private @Getter @Setter long idCategoria;
    private @Getter @Setter String nome;
}