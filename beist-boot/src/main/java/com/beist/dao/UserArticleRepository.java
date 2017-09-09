package com.beist.dao;

import com.beist.entity.Article;
import com.beist.entity.User;
import com.beist.entity.UserArticle;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by jyy1996 on 2017/9/9.
 */

public interface UserArticleRepository extends CrudRepository<UserArticle, Long> {

    // 返回待阅读文章列表
    @Query(value = "select * from UA where user_id_ = :userId",nativeQuery = true)
    List<UserArticle> findUserArticlesByUser(@Param("userId") Long userId);

    UserArticle findByUserAndArticle(User user, Article article);

    @Modifying
    @Query(value = "update UA set state = :state where user_id_ = :userId and article_id = :articleId", nativeQuery = true)
    void updateStateByUserAndArticle(@Param("state") String state, @Param("userId") Long userId, @Param("articleId") Long articleId);

}