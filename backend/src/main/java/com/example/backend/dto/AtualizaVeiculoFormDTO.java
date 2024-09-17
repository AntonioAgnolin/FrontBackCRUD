package com.example.backend.dto;

import com.example.backend.entity.Veiculo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AtualizaVeiculoFormDTO {

    private String modelo;
    private String placa;

    public void atualiza(Veiculo veiculo) {
        veiculo.setModelo(modelo);
        veiculo.setPlaca(placa);
    }
}