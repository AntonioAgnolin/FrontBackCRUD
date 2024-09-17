package com.example.backend.dto;

import com.example.backend.entity.Veiculo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class VeiculoFormDTO {

    private Long id;
    private String modelo;
    private Integer anoFabricacao;
    private String placa;

    public Veiculo converter() {
        Veiculo veiculo = new Veiculo();
        veiculo.setId(id);
        veiculo.setModelo(modelo);
        veiculo.setAnoFabricacao(anoFabricacao);
        veiculo.setPlaca(placa);
        return veiculo;
    }
}