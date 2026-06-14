package com.tonsite.controller;
import com.tonsite.model.SiteImage;
import com.tonsite.service.SiteImageService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/site-images")
public class SiteImageController {
    private final SiteImageService service;
    public SiteImageController(SiteImageService service) { this.service = service; }
    @GetMapping
    public List<SiteImage> getAll() { return service.getAll(); }
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public SiteImage upsert(@RequestBody Map<String, String> body) {
        return service.upsert(body.get("cle"), body.get("imageUrl"), body.get("description"));
    }
}