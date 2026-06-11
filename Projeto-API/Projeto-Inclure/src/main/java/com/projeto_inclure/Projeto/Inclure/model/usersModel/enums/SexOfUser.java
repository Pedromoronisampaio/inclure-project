package com.projeto_inclure.Projeto.Inclure.model.usersModel.enums;

public enum SexOfUser {
    MALE("male"),
    FEMALE("female"),
    NOT_INFORMED("not_informed");

    private String sexOfUser;

    SexOfUser (String sexOfUser){
        this.sexOfUser = sexOfUser;
    }
}
