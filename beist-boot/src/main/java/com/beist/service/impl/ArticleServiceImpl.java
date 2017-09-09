package com.beist.service.impl;

import com.beist.dao.ArticleRepository;
import com.beist.dao.UserArticleRepository;
import com.beist.entity.Article;
import com.beist.entity.User;
import com.beist.entity.UserArticle;
import com.beist.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArticleServiceImpl implements ArticleService{
    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserArticleRepository userarticleRepository;
/*
    @Autowired
    private ArticleRepository articleRepository;
*/
    @Override
    public Iterable<Article> findAll() {
        return articleRepository.findAll();
    }

    @Override
    public void save(Article article) {
        articleRepository.save(article);
    }

    @Override
    @Transactional
    public void updateArticleLevelByArticleId(String articleLevel, Long articleId){
        articleRepository.updateArticleLevelByArticleId(articleLevel, articleId);
    }
    // 返回用户文章推荐列表
    @Override
    public List<Article> findArticleListByArticleLevel(String articleLevel) {
        return articleRepository.findArticleListByArticleLevel(articleLevel);
    }

    @Override
    public List<UserArticle> findUserArticlesByUser(Long userId) {
        return userarticleRepository.findUserArticlesByUser(userId);
    }

    @Override
    public Article findArticleByArticleId(Long articleId) {
        return articleRepository.findArticleByArticleId(articleId);
    }

    @Override
    public UserArticle findByUserAndArticle(User user, Article article) {
        return userarticleRepository.findByUserAndArticle(user, article);
    }

    @Override
    public UserArticle save(UserArticle userArticle) {
        return userarticleRepository.save(userArticle);
    }

}
