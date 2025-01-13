package com.visitly.assignment;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.visitly.assignment.entities.User;
import com.visitly.assignment.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void shouldCreateUser() throws Exception {
        User user = new User(null, "username", "first", "last", "email@example.com", "password", "gender");

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username", is("username")));
    }

    @Test
    void shouldGetUserById() throws Exception {
        User user = new User(null, "username", "first", "last", "email@example.com", "password", "gender");
        User savedUser = userRepository.save(user);

        mockMvc.perform(get("/api/users/{id}", savedUser.getUserId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("username")));
    }

    @Test
    void shouldReturn404WhenUserNotFound() throws Exception {
        mockMvc.perform(get("/api/users/{id}", 1L))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldUpdateUser() throws Exception {
        User user = new User(null, "username", "first", "last", "email@example.com", "password", "gender");
        User savedUser = userRepository.save(user);

        User updatedUser = new User(null, "updatedUsername", "updatedFirst", "updatedLast", "updatedEmail@example.com", "updatedPassword", "gender");

        mockMvc.perform(put("/api/users/{id}", savedUser.getUserId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is("updatedUsername")));
    }

    @Test
    void shouldDeleteUser() throws Exception {
        User user = new User(null, "username", "first", "last", "email@example.com", "password", "gender");
        User savedUser = userRepository.save(user);

        mockMvc.perform(delete("/api/users/{id}", savedUser.getUserId()))
                .andExpect(status().isNoContent());

        assertFalse(userRepository.findById(savedUser.getUserId()).isPresent());
    }
}
