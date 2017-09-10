package com.beist.dao;

import com.beist.entity.Article;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by zhang on 2017/9/3.
 */
public interface ArticleRepository extends CrudRepository<Article, Long> {

    @Modifying
    @Query("update Article set articleLevel = :articleLevel where articleId =:articleId")
    void updateArticleLevelByArticleId(@Param("articleLevel") String articleLevel, @Param("articleId") Long articleId);

    //返回相应水平的文章
    @Query(value = "select * from A where article_level = :articleLevel order by newid()",nativeQuery = true)
    List<Article> findArticleListByArticleLevel(@Param("articleLevel") String articleLevel);

    Article findArticleByArticleId(Long articleId);

}
