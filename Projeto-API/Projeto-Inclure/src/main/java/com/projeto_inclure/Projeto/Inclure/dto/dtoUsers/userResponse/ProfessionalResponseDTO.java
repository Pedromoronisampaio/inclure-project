package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.Professional;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

import java.time.LocalDate;
import java.util.UUID;

public record ProfessionalResponseDTO(UUID idUser, String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail, String userPassword, String userLocal, String userPhoto, UserRoles userRole, String professionalName, String professionalEmail, String registrationNumber, String specialty, String socialNetwork, String experienceTime, String description, String typeService, String contactNumber, Boolean validate) {

    public ProfessionalResponseDTO(Professional professional){
        this(professional.getIdUser(), professional.getUserNickname(), professional.getDateBirth(), professional.getSexOfUser(), professional.getYesOrNoNeurodivergent(),
                professional.getUserEmail(), professional.getUserPassword(),
                professional.getUserLocal(), professional.getUserPhoto(), professional.getUserRole(),
                professional.getProfessionalName(), professional.getProfessionalEmail(),
                professional.getRegistrationNumber(), professional.getSpecialty(), professional.getSocialNetwork(),
                professional.getExperienceTime(), professional.getDescription(), professional.getTypeService(),
                professional.getContactNumber(), professional.getValidate());
    }
}
