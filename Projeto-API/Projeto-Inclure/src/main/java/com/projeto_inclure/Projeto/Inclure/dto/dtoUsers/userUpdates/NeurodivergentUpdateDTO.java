package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.NeuroType;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

import java.time.LocalDate;

public record NeurodivergentUpdateDTO(String userNickname, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userPassword, String userLocal, String userPhoto, NeuroType neurodivergence, String emailParent) {
}
