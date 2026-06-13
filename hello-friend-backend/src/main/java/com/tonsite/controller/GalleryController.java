package com.tonsite.controller;
import com.tonsite.model.GalleryItem;
import com.tonsite.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    private final GalleryService galleryService;
    public GalleryController(GalleryService galleryService) { this.galleryService = galleryService; }
    @GetMapping
    public List<GalleryItem> getAll() { return galleryService.getAll(); }
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public GalleryItem create(@RequestBody GalleryItem item) { return galleryService.create(item); }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) { galleryService.delete(id); return ResponseEntity.noContent().build(); }
}