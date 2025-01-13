package com.visitly.assignment.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    // Getters and Setters
    private Long userId;

    @NotBlank(message = "Username is required")
    @Size(min = 3,max = 20,message = "Username must be between 3 to 20 characters")
    private String username;
    @NotBlank(message = "First name is required")
    @Size(min = 1, max = 20, message = "First name must be between 1 and 20 characters")
    private String firstName;
    @NotBlank(message = "Last name is required")
    @Size(min = 1, max = 20, message = "Last name must be between 1 and 20 characters")
    private String lastName;
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank(message = "Gender is required")
    private String gender;
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 25, message = "Password must be between 6 and 25 characters")
    private String password;

}
