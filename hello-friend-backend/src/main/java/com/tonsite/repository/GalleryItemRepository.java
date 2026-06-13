package com.tonsite.repository;
import com.tonsite.model.GalleryItem;
import org.springframework.data.jpa.repository.JpaRepository;
public interface GalleryItemRepository extends JpaRepository<GalleryItem, Long> {}