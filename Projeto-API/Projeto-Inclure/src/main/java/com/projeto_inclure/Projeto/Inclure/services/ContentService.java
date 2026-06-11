package com.projeto_inclure.Projeto.Inclure.services;

import com.projeto_inclure.Projeto.Inclure.dto.dtoContent.contentRequestDTO.InstitutionRequestDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoContent.contentResponseDTO.InstitutionResponseDTO;
import com.projeto_inclure.Projeto.Inclure.model.infoModel.Institution;
import com.projeto_inclure.Projeto.Inclure.repositories.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ContentService {

    @Autowired
    InstitutionRepository institutionRepository;

    public List<InstitutionResponseDTO> allOngs(){
        List<InstitutionResponseDTO> institutionsList = institutionRepository.findAll().stream().map(InstitutionResponseDTO::new).toList();
        return institutionsList;
    }

    public ResponseEntity registerInstitution(@RequestBody InstitutionRequestDTO data){
        if(this.institutionRepository.findByCnpjInstitution(data.cnpjInstitution()) != null) return ResponseEntity.badRequest().build();

        Institution newInstitution = new Institution(data.nameInstitution(), data.localInstitution(), data.focusInstitution(),
                data.descriptionInstitution(), data.emailInstitution(), data.urlOfficialWebsite(), data.imageInstitution(), data.cnpjInstitution());

        this.institutionRepository.save(newInstitution);

        return ResponseEntity.ok().build();
    }
}
