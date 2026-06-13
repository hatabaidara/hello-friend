package com.tonsite.service;

import com.tonsite.model.News;
import com.tonsite.repository.NewsRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NewsService {

    private final NewsRepository newsRepository;

    public NewsService(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    public News createNews(News news) {
        if (news.getDatePublication() == null) {
            news.setDatePublication(LocalDate.now());
        }
        return newsRepository.save(news);
    }

    public List<News> getAllNews() {
        return newsRepository.findAll();
    }
    public News getNewsById(Long id) {
        return newsRepository.findById(id).orElseThrow(() -> new RuntimeException("Article introuvable"));
    }
    public News updateNews(Long id, News updated) {
        News news = newsRepository.findById(id).orElseThrow(() -> new RuntimeException("Article introuvable"));
        news.setTitre(updated.getTitre());
        news.setContenu(updated.getContenu());
        if (updated.getDatePublication() != null) news.setDatePublication(updated.getDatePublication());
        return newsRepository.save(news);
    }
    public void deleteNews(Long id) {
        newsRepository.deleteById(id);
    }
}
