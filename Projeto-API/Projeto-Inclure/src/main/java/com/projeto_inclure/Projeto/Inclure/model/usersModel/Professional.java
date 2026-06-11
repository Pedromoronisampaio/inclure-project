package com.projeto_inclure.Projeto.Inclure.model.usersModel;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = ("professional_user"))
@Setter
@Getter
@NoArgsConstructor
public class Professional extends User {

    @Column(name = "registration_number")
    private String registrationNumber;

    @Column(name = "professional_name")
    private String professionalName;

    @Column(name = "professional_email")
    private String professionalEmail;

    @Column(name = "specialty")
    private String specialty;

    @Column(name = "social_network")
    private String socialNetwork;

    @Column(name = "experience_time")
    private String experienceTime;

    @Column(name = "description")
    private String description;

    @Column(name = "type_service")
    private String typeService;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "validate")
    private Boolean validate;

    public Professional(String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail, String userPassword,
                        String userLocal, String userPhoto, UserRoles userRole, String professionalName, String professionalEmail, String registrationNumber, String specialty,
                        String socialNetwork, String experienceTime, String description, String typeService, String contactNumber, Boolean validate) {
        super(userNickname, dateBirth, sexOfUser, yesOrNoNeurodivergent, userEmail, userPassword, userLocal, userPhoto, userRole);
        this.professionalName = professionalName;
        this.professionalEmail = professionalEmail;
        this.registrationNumber = registrationNumber;
        this.specialty = specialty;
        this.socialNetwork = socialNetwork;
        this.experienceTime = experienceTime;
        this.description = description;
        this.typeService = typeService;
        this.contactNumber = contactNumber;
        this.validate = validate;
    }
}
