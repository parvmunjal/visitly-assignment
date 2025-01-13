package com.visitly.assignment;

import com.visitly.assignment.dtos.UserDTO;
import com.visitly.assignment.entities.User;
import com.visitly.assignment.exceptions.UserNotFoundException;
import com.visitly.assignment.repositories.UserRepository;
import com.visitly.assignment.services.implementation.UserServiceImplementation;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;
    @InjectMocks
    private UserServiceImplementation userServiceImplementation;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    //tests
    @Test
    void shouldCreateUser(){
        UserDTO userDTO=new UserDTO(null,"username","first","last","email","gender","password");
        User user=new User(null,"username","first","last","email","password","gender");
        User savedUser=new User(1L,"username","first","last","email","password","gender");

        when(modelMapper.map(userDTO, User.class)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(savedUser);
        when(modelMapper.map(savedUser, UserDTO.class)).thenReturn(userDTO);

        UserDTO result = userServiceImplementation.createUser(userDTO);

        assertNotNull(result);
        assertEquals(userDTO.getUsername(), result.getUsername());
        assertEquals(userDTO.getEmail(), result.getEmail());
        verify(userRepository).save(user);
    }

    @Test
    void shouldReturnUserWhenExists(){
        Long userId=1L;
        User user=new User(userId,"username","first","last","email","password","gender");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserDTO.class)).thenReturn(new UserDTO(userId, "username", "first", "last", "email", "gender", "password"));

        UserDTO result = userServiceImplementation.getUserById(userId);

        assertNotNull(result);
        assertEquals(userId, result.getUserId());
        verify(userRepository).findById(userId);
    }

    @Test
    void shouldThrowExceptionWhenUserNotFound() {
        Long userId = 1L;

        when(userRepository.findById(userId)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userServiceImplementation.getUserById(userId));
    }

    @Test
    void shouldGetAllUsers() {
        List<User> users = Arrays.asList(
                new User(1L, "username1", "first1", "last1", "email1", "password1", "gender1"),
                new User(2L, "username2", "first2", "last2", "email2", "password2", "gender2")
        );

        when(userRepository.findAll()).thenReturn(users);
        when(modelMapper.map(any(User.class), eq(UserDTO.class)))
                .thenReturn(new UserDTO(1L, "username1", "first1", "last1", "email1", "gender1", "password1"),
                        new UserDTO(2L, "username2", "first2", "last2", "email2", "gender2", "password2"));

        List<UserDTO> result = userServiceImplementation.getAllUsers();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(userRepository).findAll();
    }

    @Test
    void shouldUpdateUser(){
        Long userId = 1L;
        UserDTO updatedUserDTO = new UserDTO(null, "updatedUsername", "updatedFirst", "updatedLast", "updatedEmail", "gender", "updatedPassword");
        User existingUser = new User(userId, "username", "first", "last", "email", "password", "gender");
        User updatedUser = new User(userId, "updatedUsername", "updatedFirst", "updatedLast", "updatedEmail", "updatedPassword", "gender");

        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(userRepository.save(existingUser)).thenReturn(updatedUser);
        when(modelMapper.map(updatedUser, UserDTO.class)).thenReturn(new UserDTO(userId, "updatedUsername", "updatedFirst", "updatedLast", "updatedEmail", "gender", "updatedPassword"));

        UserDTO result = userServiceImplementation.updateUser(userId, updatedUserDTO);

        assertNotNull(result);
        assertEquals("updatedUsername", result.getUsername());
        verify(userRepository).save(existingUser);
    }

    @Test
    void shouldDeleteUser(){
        Long userId = 1L;
        User user = new User(userId, "username", "first", "last", "email", "password", "gender");

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        doNothing().when(userRepository).delete(user);

        userServiceImplementation.deleteUser(userId);

        verify(userRepository).delete(user);
    }

}
