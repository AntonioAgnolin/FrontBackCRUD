package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.example.backend.entity.Acessorio;

import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "VEICULO")
public class Veiculo {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "ID_VEICULO")
    private Long id;
    private String modelo;
    private Integer anoFabricacao;
    private String placa;
    @OneToMany(mappedBy = "veiculo", orphanRemoval = true)
    private List<Acessorio> acessorios;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAnoFabricacao() {
        return anoFabricacao;
    }

    public void setAnoFabricacao(Integer anoFabricacao) {
        this.anoFabricacao = anoFabricacao;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

}
