package com.projeto_inclure.Projeto.Inclure.model.infoModel;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = (""))
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idInstitution")
public class Institution {

    @Column(name = "id_institution")
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idInstitution;

    @Column(name = "name_institution")
    private String nameInstitution;

    @Column(name = "email_institution")
    private String emailInstitution;

    @Column(name = "local_institution")
    private String localInstitution;

    @Column(name = "focus_institution")
    private String focusInstitution;

    @Column(name = "description_institution")
    private String descriptionInstitution;

    @Column(name = "url_website")
    private String urlOfficialWebsite;

    @Column(name = "image_institution")
    private String imageInstitution;

    @Column(name = "cnpj_institution")
    private String cnpjInstitution;

    public Institution(String nameInstitution, String emailInstitution, String localInstitution, String focusInstitution, String descriptionInstitution, String urlOfficialWebsite, String cnpjInstitution, String imageInstitution) {
        this.nameInstitution = nameInstitution;
        this.emailInstitution = emailInstitution;
        this.localInstitution = localInstitution;
        this.focusInstitution = focusInstitution;
        this.descriptionInstitution = descriptionInstitution;
        this.urlOfficialWebsite = urlOfficialWebsite;
        this.cnpjInstitution = cnpjInstitution;
        this.imageInstitution = imageInstitution;
    }
}
