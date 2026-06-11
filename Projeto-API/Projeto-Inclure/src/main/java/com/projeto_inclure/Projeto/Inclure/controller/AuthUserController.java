package com.projeto_inclure.Projeto.Inclure.controller;

import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.UserAuthenticationDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.NeurodivergentRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.ProfessionalRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.UserRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.NeurodivergentResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.ProfessionalResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.UserResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.NeurodivergentUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.ProfessionalUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.UserUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.Neurodivergent;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.Professional;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.User;
import com.projeto_inclure.Projeto.Inclure.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class AuthUserController {

    @Autowired
    private UserService service;

    //PROCURANDO POR ID

    @GetMapping("/users/{idUser}")
    public ResponseEntity<User> getUser(@PathVariable ("idUser") String idUser){
        User user = service.getUser(idUser);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/usersNeuro/{idUser}")
    public ResponseEntity<Neurodivergent> getNeurodivergent(@PathVariable ("idUser") String idUser){
        Neurodivergent neurodivergent = service.getNeurodivergent(idUser);
        return ResponseEntity.ok(neurodivergent);
    }

    @GetMapping("/profissionais/{idUser}")
    public ResponseEntity<Professional> getProfessional(@PathVariable ("idUser") String idUser){
        Professional professional = service.getProfessional(idUser);
        return ResponseEntity.ok(professional);
    }

    //PUXANDO TODOS

    @GetMapping("/users")
    public List<UserResponseDTO> getAll() {
        return service.getAll();
    }

    @GetMapping("/usersNeuro")
    public List<NeurodivergentResponseDTO> getNeuroAll() {
        return service.getNeuroAll();
    }

    @GetMapping("/profissionais")
    public List<ProfessionalResponseDTO> getProfessionalAll() {
        return service.getProfessionalAll();
    }


    //CADASTROS

    @PostMapping("/cadastro")
    public ResponseEntity registerUser(@RequestBody UserRegisterDTO data) {
        return service.registerUser(data);
    }

    @PostMapping("/cadastro/neurodivergente")
    public ResponseEntity registerNeurodivergent(@RequestBody NeurodivergentRegisterDTO data){
        return service.registerNeurodivergent(data);
    }

    @PostMapping("cadastro/profissional/")
    public ResponseEntity registerProfessional(@RequestBody ProfessionalRegisterDTO data){
        return service.registerProfessional(data);
    }

    //LOGIN

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody UserAuthenticationDTO data){
        return service.login(data);
    }


    //ALTERAÇÕES

    @PutMapping("perfil/{idUser}")
    public ResponseEntity<Void> updateUserById(@PathVariable("idUser") String idUser, @RequestBody UserUpdateDTO userUpdateDTO){
        service.updateUserById(idUser, userUpdateDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("perfil/neurodivergente/{idUser}")
    public ResponseEntity<Void> updateUserById(@PathVariable("idUser") String idUser, @RequestBody NeurodivergentUpdateDTO neurodivergentUpdateDTO){
        service.updateNeurodivergentById(idUser, neurodivergentUpdateDTO);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("perfil/profissional/{idUser}")
    public ResponseEntity<Void> updateUserById(@PathVariable("idUser") String idUser, @RequestBody ProfessionalUpdateDTO professionalUpdateDTO){
        service.updateProfessionalById(idUser, professionalUpdateDTO);
        return ResponseEntity.noContent().build();
    }

    //DELETAR

    @DeleteMapping("deleteUser/{idUser}")
    public ResponseEntity<Void> deleteUsersById(@PathVariable("idUser") String idUser){
        service.deleteUserById(idUser);
        return ResponseEntity.noContent().build();
    }
}
