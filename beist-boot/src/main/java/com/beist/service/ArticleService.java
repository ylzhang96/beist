package com.beist.service;

import com.beist.entity.Article;
import com.beist.entity.UserArticle;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by zhang on 2017/9/3.
 */
public interface ArticleService {
    Iterable<Article> findAll();
    void save(Article article);

    @Transactional
    void updateArticleLevelByArticleId(String articleLevel, Long articleId);

    List<Article> findArticleListByArticleLevel(String articleLevel);

    List<UserArticle> findUserArticlesByUser(Long userId);
}
