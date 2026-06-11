package com.projeto_inclure.Projeto.Inclure.model.usersModel;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.NeuroType;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@Entity
@Table(name = ("neurodivergent_user"))
@Setter
@Getter
@NoArgsConstructor
public class Neurodivergent extends User {

    @Column(name = "neurodivergence")
    @Enumerated(EnumType.STRING)
    private NeuroType neurodivergence;

    @Column(name = "email_parent")
    private String emailParent;

    public Neurodivergent(String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail,
                          String userPassword, String userLocal, String userPhoto, UserRoles userRole, NeuroType neurodivergence, String emailParent) {
        super(userNickname, dateBirth, sexOfUser, yesOrNoNeurodivergent, userEmail, userPassword, userLocal, userPhoto, userRole);
        this.neurodivergence = neurodivergence;
        this.emailParent = emailParent;
    }
}
