package com.visitly.assignment.services;

import com.visitly.assignment.dtos.UserDTO;
import com.visitly.assignment.entities.User;

import java.util.List;

public interface UserService {
    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserById(Long userId);
    List<UserDTO> getAllUsers();
    UserDTO updateUser(Long userId,UserDTO userDTO);
    void deleteUser(Long userId);
}
