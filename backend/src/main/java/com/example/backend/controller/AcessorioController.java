package com.example.backend.controller;

import com.example.backend.dto.AcessorioDTO;
import com.example.backend.dto.AcessorioFormDTO;
import com.example.backend.dto.AtualizaAcessorioFormDTO;
import com.example.backend.dto.DetalhesAcessorioDTO;
import com.example.backend.entity.Acessorio;
import com.example.backend.repository.AcessorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class AcessorioController {

    @Autowired
    private AcessorioRepository acessorioRepository;

    @GetMapping
    public List<AcessorioDTO> listar() {
        List<Acessorio> acessorios = acessorioRepository.findAll();
        return AcessorioDTO.converter(acessorios);
    }

    @Transactional
    @PostMapping
    public AcessorioDTO salvar(@RequestBody AcessorioFormDTO form) {
        Acessorio acessorio = form.converter();
        acessorioRepository.save(acessorio);
        return new AcessorioDTO(acessorio);
    }

    @Transactional
    @PutMapping("/{id}")
    public DetalhesAcessorioDTO atualizar(@PathVariable Long id, @RequestBody AtualizaAcessorioFormDTO form) {

        final Optional<Acessorio> optAcessorio = acessorioRepository.findById(id);

        if(optAcessorio.isPresent()){
            Acessorio acessorio = optAcessorio.get();
            form.atualiza(acessorio);
            acessorioRepository.save(acessorio);
            return new DetalhesAcessorioDTO(acessorio);
        }

        System.out.println("Acessório não encontrado");
        return null;
    }

    @Transactional
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {

        final Optional<Acessorio> optAcessorio = acessorioRepository.findById(id);

        if (optAcessorio.isPresent()) {
            acessorioRepository.deleteById(id);
        }

    }

}
