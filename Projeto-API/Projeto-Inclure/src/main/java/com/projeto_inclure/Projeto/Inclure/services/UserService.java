package com.projeto_inclure.Projeto.Inclure.services;

import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.UserAuthenticationDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.NeurodivergentRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.ProfessionalRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userRegisters.UserRegisterDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.LoginResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.NeurodivergentResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.ProfessionalResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userResponse.UserResponseDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.NeurodivergentUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.ProfessionalUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.dto.dtoUsers.userUpdates.UserUpdateDTO;
import com.projeto_inclure.Projeto.Inclure.infra.security.TokenService;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.Neurodivergent;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.Professional;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.User;
import com.projeto_inclure.Projeto.Inclure.model.usersModel.enums.UserRoles;
import com.projeto_inclure.Projeto.Inclure.repositories.NeuroRepository;
import com.projeto_inclure.Projeto.Inclure.repositories.ProfessionalRepository;
import com.projeto_inclure.Projeto.Inclure.repositories.UserRepository;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NeuroRepository neuroRepository;

    @Autowired
    private ProfessionalRepository professionalRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private EmailValidadorService emailValidadorService;

    //Usuários
    public User getUser(String idUser){
        var id = UUID.fromString(idUser);
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("Não encontrado"));
    }

    public Neurodivergent getNeurodivergent(String idUser){
        var id = UUID.fromString(idUser);
        return neuroRepository.findById(id).orElseThrow(() -> new RuntimeException("Não encontrado"));
    }

    public Professional getProfessional(String idUser){
        var id = UUID.fromString(idUser);
        return professionalRepository.findById(id).orElseThrow(() -> new RuntimeException("Não encontrado"));
    }

    //Listas de usuários
    public List<UserResponseDTO> getAll(){
        List<UserResponseDTO> usersList = userRepository.findAll().stream().map(UserResponseDTO::new).toList();
        return usersList;
    }

    public List<NeurodivergentResponseDTO> getNeuroAll(){
        List<NeurodivergentResponseDTO> usersNeuroList = neuroRepository.findAll().stream().map(NeurodivergentResponseDTO::new).toList();
        return usersNeuroList;
    }

    public List<ProfessionalResponseDTO> getProfessionalAll(){
        List<ProfessionalResponseDTO> usersProfessionalList = professionalRepository.findAll().stream().map(ProfessionalResponseDTO::new).toList();
        return usersProfessionalList;
    }

    //Cadastros de usuários

    public ResponseEntity registerUser(@RequestBody UserRegisterDTO data){
        if (!emailValidadorService.dominioExists(data.userEmail())) return ResponseEntity.badRequest().build();

        if(this.userRepository.findByUserEmail(data.userEmail()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.userPassword());

        User newUser = new User(data.userNickname(), data.dateBirth() ,data.sexOfUser(), data.yesOrNoNeurodivergent(), data.userEmail(),
                encryptedPassword, data.userLocal(), data.userPhoto(), UserRoles.ROLE_COMMUN);

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity registerNeurodivergent(@RequestBody NeurodivergentRegisterDTO data){
        if (!emailValidadorService.dominioExists(data.userEmail())) return ResponseEntity.badRequest().build();

        if(this.userRepository.findByUserEmail(data.userEmail()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.userPassword());

        Neurodivergent newNeurodivergent = new Neurodivergent(data.userNickname(), data.dateBirth(), data.sexOfUser(), data.yesOrNoNeurodivergent(),
                data.userEmail(), encryptedPassword, data.userLocal(), data.userPhoto(), UserRoles.ROLE_NEURODIVERGENT,
                data.neurodivergence(), data.emailParent());

        this.neuroRepository.save(newNeurodivergent);

        return ResponseEntity.ok().build();
    }

    public ResponseEntity registerProfessional(@RequestBody ProfessionalRegisterDTO data){
        if (!emailValidadorService.dominioExists(data.userEmail())) return ResponseEntity.badRequest().build();

        if(this.userRepository.findByUserEmail(data.userEmail()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.userPassword());

        Professional newProfessional = new Professional(data.userNickname(), data.dateBirth(), data.sexOfUser(), data.yesOrNoNeurodivergent(),
                data.userEmail(), encryptedPassword, data.userLocal(), data.userPhoto(), UserRoles.ROLE_PROFESSIONAL,
                data.professionalName(), data.professionalEmail(),
                data.registrationNumber(), data.specialty(), data.socialNetwork(),
                data.experienceTime(), data.description(), data.typeService(), data.contactNumber(), data.validate());

        this.professionalRepository.save(newProfessional);

        return ResponseEntity.ok().build();
    }

    //Login de usuários

    public ResponseEntity login(@RequestBody UserAuthenticationDTO data){
        var userEmailPassword = new UsernamePasswordAuthenticationToken(data.userEmail(), data.userPassword());
        var auth = this.authenticationManager.authenticate(userEmailPassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }

    //Alteração de informações

    public void updateUserById(String idUser, UserUpdateDTO userUpdateDTO) {
        var id = UUID.fromString(idUser);

        var userEntity = userRepository.findById(id);

        if (userEntity.isPresent()) {
            var user = userEntity.get();

            if (userUpdateDTO.userNickname() != null) {
                user.setUserNickname(userUpdateDTO.userNickname());
            }

            if (userUpdateDTO.sexOfUser() != null) {
                user.setSexOfUser(userUpdateDTO.sexOfUser());
            }

            if (userUpdateDTO.yesOrNoNeurodivergent() != null) {
                user.setYesOrNoNeurodivergent(userUpdateDTO.yesOrNoNeurodivergent());
            }

            if (userUpdateDTO.userPassword() != null) {
                user.setUserPassword(userUpdateDTO.userPassword());
            }

            if (userUpdateDTO.userLocal() != null) {
                user.setUserLocal(userUpdateDTO.userLocal());
            }

            if (userUpdateDTO.userPhoto() != null) {
                user.setUserPhoto(userUpdateDTO.userPhoto());
            }

            userRepository.save(user);
        }
    }

        public void updateNeurodivergentById(String idUser, NeurodivergentUpdateDTO neurodivergentUpdateDTO) {
            var id = UUID.fromString(idUser);

            var neurodivergentEntity = neuroRepository.findById(id);

            if (neurodivergentEntity.isPresent()) {
                var neurodivergent = neurodivergentEntity.get();

                if (neurodivergentUpdateDTO.userNickname() != null) {
                    neurodivergent.setUserNickname(neurodivergentUpdateDTO.userNickname());
                }

                if (neurodivergentUpdateDTO.sexOfUser() != null) {
                    neurodivergent.setSexOfUser(neurodivergentUpdateDTO.sexOfUser());
                }

                if (neurodivergentUpdateDTO.yesOrNoNeurodivergent() != null) {
                    neurodivergent.setYesOrNoNeurodivergent(neurodivergentUpdateDTO.yesOrNoNeurodivergent());
                }

                if (neurodivergentUpdateDTO.userPassword() != null) {
                    neurodivergent.setUserPassword(neurodivergentUpdateDTO.userPassword());
                }

                if (neurodivergentUpdateDTO.userLocal() != null) {
                    neurodivergent.setUserLocal(neurodivergentUpdateDTO.userLocal());
                }

                if (neurodivergentUpdateDTO.userPhoto() != null) {
                    neurodivergent.setUserPhoto(neurodivergentUpdateDTO.userPhoto());
                }

                if (neurodivergentUpdateDTO.neurodivergence() != null) {
                    neurodivergent.setNeurodivergence(neurodivergentUpdateDTO.neurodivergence());
                }

                if (neurodivergentUpdateDTO.emailParent() != null) {
                    neurodivergent.setEmailParent(neurodivergentUpdateDTO.emailParent());
                }

                neuroRepository.save(neurodivergent);
            }
        }

    public void updateProfessionalById(String idUser, ProfessionalUpdateDTO professionalUpdateDTO) {
        var id = UUID.fromString(idUser);

        var professionalEntity = professionalRepository.findById(id);

        if (professionalEntity.isPresent()) {
            var professional = professionalEntity.get();

            if (professionalUpdateDTO.userNickname() != null) {
                professional.setUserNickname(professionalUpdateDTO.userNickname());
            }

            if (professionalUpdateDTO.sexOfUser() != null) {
                professional.setSexOfUser(professionalUpdateDTO.sexOfUser());
            }

            if (professionalUpdateDTO.yesOrNoNeurodivergent() != null) {
                professional.setYesOrNoNeurodivergent(professionalUpdateDTO.yesOrNoNeurodivergent());
            }

            if (professionalUpdateDTO.userPassword() != null) {
                professional.setUserPassword(professionalUpdateDTO.userPassword());
            }

            if (professionalUpdateDTO.userLocal() != null) {
                professional.setUserLocal(professionalUpdateDTO.userLocal());
            }

            if (professionalUpdateDTO.userPhoto() != null) {
                professional.setUserPhoto(professionalUpdateDTO.userPhoto());
            }

            if (professionalUpdateDTO.registrationNumber() != null) {
                professional.setRegistrationNumber(professionalUpdateDTO.registrationNumber());
            }

            if (professionalUpdateDTO.specialty() != null) {
                professional.setSpecialty(professionalUpdateDTO.specialty());
            }

            if (professionalUpdateDTO.socialNetwork() != null) {
                professional.setExperienceTime(professionalUpdateDTO.experienceTime());
            }

            if (professionalUpdateDTO.description() != null) {
                professional.setDescription(professionalUpdateDTO.description());
            }

            if (professionalUpdateDTO.typeService() != null) {
                professional.setTypeService(professionalUpdateDTO.typeService());
            }

            if (professionalUpdateDTO.contactNumber() != null) {
                professional.setContactNumber(professionalUpdateDTO.contactNumber());
            }

            professionalRepository.save(professional);
        }
    }

    //Deletar

    public void deleteUserById(String idUser){
        var id = UUID.fromString(idUser);

        var userExists = userRepository.existsById(id);

        if (userExists) {
            userRepository.deleteById(id);
            neuroRepository.deleteById(id);
            professionalRepository.deleteById(id);
        }
    }


}
