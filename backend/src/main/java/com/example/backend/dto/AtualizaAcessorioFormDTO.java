package com.example.backend.dto;

import com.example.backend.entity.Acessorio;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AtualizaAcessorioFormDTO {
    private String nome;

    public void atualiza(Acessorio acessorio) {
        acessorio.setNome(nome);
    }
}
