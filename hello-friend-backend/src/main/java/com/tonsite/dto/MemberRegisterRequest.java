package com.tonsite.dto;

import com.tonsite.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRegisterRequest {
    @NotBlank
    @Size(max = 120)
    private String nom;

    @NotBlank
    @Email
    @Size(max = 180)
    private String email;

    @NotBlank
    @Size(max = 30)
    private String telephone;

    @NotBlank
    @Size(max = 120)
    private String ville;

    private Role role;

    @NotBlank
    @Size(min = 8, max = 255)
    private String motDePasse;
}
