package com.tonsite.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "partners")
@Getter
@Setter
public class Partner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 150)
    private String nom;

    @NotBlank
    @Size(max = 2000)
    private String description;

    @Size(max = 255)
    private String siteWeb;

    @Size(max = 255)
    private String logoUrl;
}
