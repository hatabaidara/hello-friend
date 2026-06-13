package com.tonsite.controller;
import com.tonsite.model.Partner;
import com.tonsite.service.PartnerService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/partners")
public class PartnerController {
    private final PartnerService partnerService;
    public PartnerController(PartnerService partnerService) { this.partnerService = partnerService; }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Partner createPartner(@Valid @RequestBody Partner partner) { return partnerService.createPartner(partner); }

    @GetMapping
    public List<Partner> getAllPartners() { return partnerService.getAllPartners(); }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Partner updatePartner(@PathVariable Long id, @Valid @RequestBody Partner partner) { return partnerService.updatePartner(id, partner); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePartner(@PathVariable Long id) { partnerService.deletePartner(id); return ResponseEntity.noContent().build(); }
}