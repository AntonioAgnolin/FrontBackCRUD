package com.example.backend.dto;

import com.example.backend.entity.Acessorio;
import lombok.Getter;

@Getter
public class DetalhesAcessorioDTO {
    private Long id;
    private String nome;

    public DetalhesAcessorioDTO(Acessorio acessorio) {
        id = acessorio.getId();
        nome = acessorio.getNome();
    }
}
