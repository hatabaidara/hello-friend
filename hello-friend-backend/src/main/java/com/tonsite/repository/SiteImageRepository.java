package com.tonsite.repository;
import com.tonsite.model.SiteImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface SiteImageRepository extends JpaRepository<SiteImage, Long> {
    Optional<SiteImage> findByCle(String cle);
}