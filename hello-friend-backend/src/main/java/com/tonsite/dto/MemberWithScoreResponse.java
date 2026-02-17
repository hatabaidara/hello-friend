package com.tonsite.dto;

import com.tonsite.model.Role;

public class MemberWithScoreResponse {
    private Long id;
    private String nom;
    private String email;
    private String telephone;
    private String ville;
    private Role role;
    private Double engagementScore;
    private String riskLevel;

    public MemberWithScoreResponse(Long id,
                                   String nom,
                                   String email,
                                   String telephone,
                                   String ville,
                                   Role role,
                                   Double engagementScore,
                                   String riskLevel) {
        this.id = id;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
        this.ville = ville;
        this.role = role;
        this.engagementScore = engagementScore;
        this.riskLevel = riskLevel;
    }

    public Long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getEmail() {
        return email;
    }

    public String getTelephone() {
        return telephone;
    }

    public String getVille() {
        return ville;
    }

    public Role getRole() {
        return role;
    }

    public Double getEngagementScore() {
        return engagementScore;
    }

    public String getRiskLevel() {
        return riskLevel;
    }
}
