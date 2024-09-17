package com.example.backend.controller;

import com.example.backend.dto.AtualizaVeiculoFormDTO;
import com.example.backend.dto.DetalhesVeiculoDTO;
import com.example.backend.dto.VeiculoDTO;
import com.example.backend.dto.VeiculoFormDTO;
import com.example.backend.entity.Veiculo;
import com.example.backend.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    public List<VeiculoDTO> listar() {
        List<Veiculo> veiculos = veiculoRepository.findAll();
        return VeiculoDTO.converter(veiculos);
    }

    @Transactional
    @PostMapping
    public VeiculoDTO salvar(@RequestBody VeiculoFormDTO form) {
        Veiculo veiculo = form.converter();
        veiculoRepository.save(veiculo);
        return new VeiculoDTO(veiculo);
    }

    @Transactional
    @PutMapping("/{id}")
    public DetalhesVeiculoDTO atualizar(@PathVariable Long id, @RequestBody AtualizaVeiculoFormDTO form) {

        final Optional<Veiculo> optVeiculo = veiculoRepository.findById(id);

        if(optVeiculo.isPresent()){
            Veiculo veiculo = optVeiculo.get();
            form.atualiza(veiculo);
            veiculoRepository.save(veiculo);
            return new DetalhesVeiculoDTO(veiculo);
        }

        System.out.println("Veículo não encontrado");
        return null;
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        final Optional<Veiculo> optVeiculo = veiculoRepository.findById(id);

        if (optVeiculo.isPresent()) {
            veiculoRepository.deleteById(id);
        }

    }

}
