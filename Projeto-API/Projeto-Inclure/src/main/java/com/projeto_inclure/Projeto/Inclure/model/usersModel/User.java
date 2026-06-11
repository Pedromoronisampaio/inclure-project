package com.projeto_inclure.Projeto.Inclure.model.usersModel;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.SexOfUser;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;
import jakarta.persistence.*;
import lombok.*;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = ("users"))
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "idUser")
public class User implements UserDetails {

    @Column(name = "id_user")
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID idUser;

    @Column(name = "user_name")
    private String userNickname;

    @Column(name = "date_birth")
    private LocalDate dateBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "sex_user")
    private SexOfUser sexOfUser;

    @Column(name = "yesorno_neurodivergent")
    private Boolean yesOrNoNeurodivergent;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_local")
    private String userLocal;

    @Column(name = "user_photo")
    private String userPhoto;

    @Column(name = "user_role")
    @Enumerated(EnumType.STRING)
    private UserRoles userRole;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.userRole == UserRoles.ROLE_ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"),
                new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));

    }

    public User(String userNickname, LocalDate dateBirth, SexOfUser sexOfUser, Boolean yesOrNoNeurodivergent, String userEmail,
                String userPassword, String userLocal, String userPhoto, UserRoles userRole){
        this.userNickname = userNickname;
        this.dateBirth = dateBirth;
        this.sexOfUser = sexOfUser;
        this.yesOrNoNeurodivergent = yesOrNoNeurodivergent;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userLocal = userLocal;
        this.userPhoto = userPhoto;
        this.userRole = userRole;
    }

    public User(String userEmail){
        this.userEmail = userEmail;
    }


    @Override
    public @Nullable String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }
}
