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
}
