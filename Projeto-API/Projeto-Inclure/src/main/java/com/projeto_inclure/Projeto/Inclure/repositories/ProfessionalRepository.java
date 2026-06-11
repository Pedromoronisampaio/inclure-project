package com.projeto_inclure.Projeto.Inclure.repositories;

import com.projeto_inclure.Projeto.Inclure.model.usersModel.Neurodivergent;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, UUID> {
}
