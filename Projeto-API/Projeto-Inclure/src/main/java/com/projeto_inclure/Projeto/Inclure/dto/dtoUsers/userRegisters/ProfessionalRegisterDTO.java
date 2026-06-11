package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

import java.time.LocalDate;

public record ProfessionalRegisterDTO(String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail, String userPassword, String userLocal, String userPhoto, String professionalName, String professionalEmail, String registrationNumber, String specialty, String socialNetwork, String experienceTime, String description, String typeService, String contactNumber, Boolean validate) {
}
