package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.User;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

import java.time.LocalDate;
import java.util.UUID;

public record UserResponseDTO(UUID idUser, String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail, String userPassword, String userLocal, String userPhoto, UserRoles userRole) {

    public UserResponseDTO(User user){
        this(user.getIdUser(), user.getUserNickname(), user.getDateBirth(), user.getSexOfUser(), user.getYesOrNoNeurodivergent(),
                user.getUserEmail(), user.getUserPassword(),
                user.getUserLocal(), user.getUserPhoto(), user.getUserRole());
    }
}
