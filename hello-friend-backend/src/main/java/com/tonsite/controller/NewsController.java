package com.tonsite.controller;

import com.tonsite.model.News;
import com.tonsite.service.NewsService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public News createNews(@Valid @RequestBody News news) {
        return newsService.createNews(news);
    }

    @GetMapping
    public List<News> getAllNews() {
        return newsService.getAllNews();
    }
}
