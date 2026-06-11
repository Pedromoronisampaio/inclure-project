package com.projeto_inclure.Projeto.Inclure.model.usersModel.enums;

public enum NeuroType {
    AUSTIM_SPECTRUM("autismo"),
    TOC("toc"),
    DYSLEXIA("dislexia");

    private String neurodivergence;

    NeuroType(String neurodivergence){
        this.neurodivergence = neurodivergence;
    }
}
