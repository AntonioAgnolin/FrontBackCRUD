package com.example.backend.dto;

import com.example.backend.entity.Acessorio;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class AcessorioDTO {
    private Long id;
    private String nome;

    public AcessorioDTO(Acessorio acessorio) {
        id = acessorio.getId();
        nome = acessorio.getNome();
    }

    public static List<AcessorioDTO> converter(List<Acessorio> acessorios) {
        return acessorios.stream().map(AcessorioDTO::new).collect(Collectors.toList());
    }
}