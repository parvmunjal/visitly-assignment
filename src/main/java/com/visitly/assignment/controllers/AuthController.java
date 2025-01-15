package com.visitly.assignment.controllers;

import com.visitly.assignment.dtos.UserDTO;
import com.visitly.assignment.entities.User;
import com.visitly.assignment.exceptions.UserNotFoundException;
import com.visitly.assignment.payload.JwtTokenProvider;
import com.visitly.assignment.payload.LoginRequest;
import com.visitly.assignment.payload.LoginResponse;
import com.visitly.assignment.repositories.UserRepository;
import com.visitly.assignment.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private final UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        String username=loginRequest.getUsername();
        String password=loginRequest.getPassword();

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UserNotFoundException("User not found with username:" + username));
        if(passwordEncoder.matches(password,user.getPassword())){
            String token = jwtTokenProvider.generateToken(loginRequest.getUsername());
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return new ResponseEntity<>(new LoginResponse("Invalid username or password"),HttpStatus.UNAUTHORIZED);

    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDTO) {
        UserDTO createdUser = userService.createUser(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }
}
