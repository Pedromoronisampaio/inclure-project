package com.projeto_inclure.Projeto.Inclure.controller;

import com.projeto_inclure.Projeto.Inclure.dto.dtoContent.contentRequestDTO.InstitutionRequestDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoContent.contentResponseDTO.InstitutionResponseDTO;
import com.projeto_inclure.Projeto.Inclure.services.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ongs")
public class ContentController {

    @Autowired
    ContentService contentService;

    @GetMapping
    public List<InstitutionResponseDTO> allOngs(){
        return contentService.allOngs();
    }

    @PostMapping("/registerInstitution")
    public ResponseEntity registerInstitution(@RequestBody InstitutionRequestDTO data){
        return contentService.registerInstitution(data);
    }

}
