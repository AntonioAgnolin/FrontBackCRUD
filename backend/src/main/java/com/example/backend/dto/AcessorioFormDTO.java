package com.example.backend.dto;

import com.example.backend.entity.Acessorio;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AcessorioFormDTO {

    private Long id;
    private String nome;

    public Acessorio converter() {
        Acessorio acessorio = new Acessorio();
        acessorio.setId(id);
        acessorio.setNome(nome);
        return acessorio;
    }
}
