package com.tonsite.service;
import com.tonsite.model.GalleryItem;
import com.tonsite.repository.GalleryItemRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@Service
public class GalleryService {
    private final GalleryItemRepository repo;
    public GalleryService(GalleryItemRepository repo) { this.repo = repo; }
    public GalleryItem create(GalleryItem item) {
        if (item.getDateAjout() == null) item.setDateAjout(LocalDate.now());
        return repo.save(item);
    }
    public List<GalleryItem> getAll() { return repo.findAll(); }
    public void delete(Long id) { repo.deleteById(id); }
}