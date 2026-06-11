package com.projeto_inclure.Projeto.Inclure.dto.dtoContent.contentResponseDTO;

import com.projeto_inclure.Projeto.Inclure.model.infoModel.Institution;

import java.util.UUID;

public record InstitutionResponseDTO(UUID idInstitution, String nameInstitution, String emailInstitution, String localInstitution, String focusInstitution, String descriptionInstitution, String urlOfficialWebsite, String imageInstitution, String cnpjInstitution) {

    public InstitutionResponseDTO(Institution institution){
        this(institution.getIdInstitution(), institution.getNameInstitution(), institution.getEmailInstitution(),
                institution.getLocalInstitution(), institution.getFocusInstitution(), institution.getDescriptionInstitution(),
                institution.getUrlOfficialWebsite(), institution.getImageInstitution(), institution.getCnpjInstitution());
    }
}
