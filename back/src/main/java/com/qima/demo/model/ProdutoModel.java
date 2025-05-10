package com.qima.demo.model;

import org.springframework.data.annotation.Id;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
public class ProdutoModel {

    @Id
    private @Getter @Setter long id;
    private @Getter @Setter String nome;
    private @Getter @Setter double preco;
    private @Getter @Setter int estoque;
    private @Getter @Setter String descricao;

    @ManyToOne
    @JoinColumn(name = "categoria", referencedColumnName = "idCategoria")
    private @Getter @Setter CategoriaModel categoria;

}
