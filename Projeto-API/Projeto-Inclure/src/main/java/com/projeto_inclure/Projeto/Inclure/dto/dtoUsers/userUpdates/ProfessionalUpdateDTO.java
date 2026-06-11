package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

public record ProfessionalUpdateDTO(String userNickname, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userPassword, String userLocal, String userPhoto, String registrationNumber, String specialty, String socialNetwork, String experienceTime, String description, String typeService, String contactNumber) {
}
