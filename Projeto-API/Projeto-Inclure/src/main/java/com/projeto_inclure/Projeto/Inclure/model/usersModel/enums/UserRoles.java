package com.projeto_inclure.Projeto.Inclure.model.usersModel.enums;

public enum UserRoles {
    ROLE_ADMIN("admin"),
    ROLE_COMMUN("user"),
    ROLE_NEURODIVERGENT("neurodivergent"),
    ROLE_PROFESSIONAL("professional");

    private String role;

    UserRoles(String role){
        this.role = role;
    }

    public String getRole(){
        return role;
    }
}
