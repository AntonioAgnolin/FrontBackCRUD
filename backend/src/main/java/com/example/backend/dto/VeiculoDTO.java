package com.example.backend.dto;

import com.example.backend.entity.Veiculo;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class VeiculoDTO {

    private Long id;
    private String modelo;
    private Integer anoFabricacao;
    private String placa;

    public VeiculoDTO(Veiculo veiculo) {
        id = veiculo.getId();
        modelo = veiculo.getModelo();
        anoFabricacao = veiculo.getAnoFabricacao();
        placa = veiculo.getPlaca();
    }

    public static List<VeiculoDTO> converter(List<Veiculo> veiculos) {
        return veiculos.stream().map(VeiculoDTO::new).collect(Collectors.toList());
    }
}