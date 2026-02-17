package com.tonsite.dto;

import com.tonsite.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class MemberRegisterRequest {
    @NotBlank
    @Size(max = 120)
    private String nom;

    @NotBlank
    @Email
    @Size(max = 180)
    private String email;

    @Size(max = 30)
    private String telephone;

    @Size(max = 120)
    private String ville;

    private Role role;

    @NotBlank
    @Size(min = 8, max = 255)
    private String motDePasse;

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
