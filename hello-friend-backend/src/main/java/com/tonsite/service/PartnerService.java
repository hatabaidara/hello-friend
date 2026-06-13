package com.tonsite.service;

import com.tonsite.model.Partner;
import com.tonsite.repository.PartnerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartnerService {

    private final PartnerRepository partnerRepository;

    public PartnerService(PartnerRepository partnerRepository) {
        this.partnerRepository = partnerRepository;
    }

    public Partner createPartner(Partner partner) {
        return partnerRepository.save(partner);
    }

    public List<Partner> getAllPartners() {
        return partnerRepository.findAll();
    }
    public Partner updatePartner(Long id, Partner updated) {
        Partner partner = partnerRepository.findById(id).orElseThrow(() -> new RuntimeException("Partenaire introuvable"));
        partner.setNom(updated.getNom());
        partner.setDescription(updated.getDescription());
        partner.setSiteWeb(updated.getSiteWeb());
        partner.setLogoUrl(updated.getLogoUrl());
        return partnerRepository.save(partner);
    }
    public void deletePartner(Long id) {
        partnerRepository.deleteById(id);
    }
}
