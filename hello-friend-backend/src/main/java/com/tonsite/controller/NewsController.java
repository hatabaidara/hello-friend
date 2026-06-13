package com.tonsite.controller;
import com.tonsite.model.News;
import com.tonsite.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/news")
public class NewsController {
    private final NewsService newsService;
    public NewsController(NewsService newsService) { this.newsService = newsService; }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public News createNews(@Valid @RequestBody News news) { return newsService.createNews(news); }

    @GetMapping
    public List<News> getAllNews() { return newsService.getAllNews(); }

    @GetMapping("/{id}")
    public News getNewsById(@PathVariable Long id) { return newsService.getNewsById(id); }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public News updateNews(@PathVariable Long id, @Valid @RequestBody News news) { return newsService.updateNews(id, news); }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) { newsService.deleteNews(id); return ResponseEntity.noContent().build(); }
}