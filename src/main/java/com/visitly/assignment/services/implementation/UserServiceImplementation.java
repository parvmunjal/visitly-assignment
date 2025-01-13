package com.visitly.assignment.services.implementation;

import com.visitly.assignment.dtos.UserDTO;
import com.visitly.assignment.entities.User;
import com.visitly.assignment.exceptions.UserNotFoundException;
import com.visitly.assignment.repositories.UserRepository;
import com.visitly.assignment.services.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImplementation implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;


    @Override
    public UserDTO createUser(UserDTO userDTO) {
        User user = dtoToUser(userDTO);
        User savedUser = userRepository.save(user);
        return userToDTO(savedUser);
    }

    @Override
    public UserDTO getUserById(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User not found with user id:"+userId));
        return userToDTO(user);
    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::userToDTO).collect(Collectors.toList());

    }

    @Override
    public UserDTO updateUser(Long userId,UserDTO userDTO) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User not found with user id:"+userId));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setGender(userDTO.getGender());
        user.setPassword(userDTO.getPassword());
        User savedUser = userRepository.save(user);
        return userToDTO(savedUser);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(()->new UserNotFoundException("User not found with user id:"+userId));
        userRepository.delete(user);
    }


    //dto to user
    private User dtoToUser(UserDTO userDTO){
        return modelMapper.map(userDTO,User.class);
    }
    //user to dto
    private UserDTO userToDTO(User user){
        return modelMapper.map(user,UserDTO.class);
    }
}
