package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;

public record UserUpdateDTO(String userNickname, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userPassword, String userLocal, String userPhoto) {
}
