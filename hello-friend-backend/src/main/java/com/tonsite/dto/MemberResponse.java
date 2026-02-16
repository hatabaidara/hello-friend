package com.tonsite.dto;

import com.tonsite.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String ville;
    private Role role;
}
