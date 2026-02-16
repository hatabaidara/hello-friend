package com.tonsite.controller;

import com.tonsite.model.Partner;
import com.tonsite.service.PartnerService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/partners")
public class PartnerController {

    private final PartnerService partnerService;

    public PartnerController(PartnerService partnerService) {
        this.partnerService = partnerService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Partner createPartner(@Valid @RequestBody Partner partner) {
        return partnerService.createPartner(partner);
    }

    @GetMapping
    public List<Partner> getAllPartners() {
        return partnerService.getAllPartners();
    }
}
