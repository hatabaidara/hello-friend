package com.tonsite.service;
import com.tonsite.model.SiteImage;
import com.tonsite.repository.SiteImageRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class SiteImageService {
    private final SiteImageRepository repo;
    public SiteImageService(SiteImageRepository repo) { this.repo = repo; }
    public List<SiteImage> getAll() { return repo.findAll(); }
    public SiteImage upsert(String cle, String imageUrl, String description) {
        SiteImage img = repo.findByCle(cle).orElse(new SiteImage());
        img.setCle(cle);
        img.setImageUrl(imageUrl);
        img.setDescription(description);
        return repo.save(img);
    }
}