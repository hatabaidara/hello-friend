package com.tonsite.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
@Entity
@Table(name = "site_images")
public class SiteImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    @Column(unique = true)
    private String cle;
    @NotBlank
    private String imageUrl;
    private String description;
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCle() { return cle; }
    public void setCle(String cle) { this.cle = cle; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}