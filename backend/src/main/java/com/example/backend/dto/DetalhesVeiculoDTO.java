package com.example.backend.dto;

import com.example.backend.entity.Veiculo;
import lombok.Getter;

@Getter
public class DetalhesVeiculoDTO {

    private Long id;
    private String modelo;
    private Integer anoFabricacao;
    private String placa;


    public DetalhesVeiculoDTO(Veiculo veiculo) {
        id = veiculo.getId();
        modelo = veiculo.getModelo();
        anoFabricacao = veiculo.getAnoFabricacao();
        placa = veiculo.getPlaca();
    }
}