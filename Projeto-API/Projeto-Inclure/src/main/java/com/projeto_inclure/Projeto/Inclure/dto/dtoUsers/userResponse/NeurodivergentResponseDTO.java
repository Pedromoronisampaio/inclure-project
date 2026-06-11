package com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.Neurodivergent;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.User;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.NeuroType;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record NeurodivergentResponseDTO(UUID idUser, String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail, String userPassword, String userLocal, String userPhoto, UserRoles userRole, NeuroType neurodivergence, String emailParent) {

    public NeurodivergentResponseDTO(Neurodivergent neurodivergent){
        this(neurodivergent.getIdUser(), neurodivergent.getUserNickname(), neurodivergent.getDateBirth(), neurodivergent.getSexOfUser(),
                neurodivergent.getYesOrNoNeurodivergent(), neurodivergent.getUserEmail(),
                neurodivergent.getPassword(), neurodivergent.getUserLocal(), neurodivergent.getUserPhoto(),
                neurodivergent.getUserRole(), neurodivergent.getNeurodivergence(),
                neurodivergent.getEmailParent());
    }


}
