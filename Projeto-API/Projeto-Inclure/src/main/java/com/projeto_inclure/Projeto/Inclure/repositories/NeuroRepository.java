package com.projeto_inclure.Projeto.Inclure.repositories;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.Neurodivergent;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NeuroRepository extends JpaRepository<Neurodivergent, UUID> {
}
