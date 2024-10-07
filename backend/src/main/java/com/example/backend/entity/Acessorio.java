package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ACESSORIO")
public class Acessorio {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "ID_ACESSORIO")
    private Long id;
    private String nome;
    @ManyToOne
    @JoinColumn (nullable = false, name = "ID_VEICULO", referencedColumnName = "ID_VEICULO")
    private Veiculo veiculo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}
