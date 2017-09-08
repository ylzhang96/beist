package com.beist.dao;

import com.beist.entity.UserArticle;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by jyy1996 on 2017/9/9.
 */

public interface UserArticleRepository extends CrudRepository<UserArticle, Long> {

    // 返回待阅读文章列表
    @Query(value = "select * from UA where user_id_ = :userId and state <> '已阅读'",nativeQuery = true)
    List<UserArticle> findUserArticlesByUser(@Param("userId") Long userId);
}