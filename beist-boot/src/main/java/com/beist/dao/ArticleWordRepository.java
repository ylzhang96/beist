package com.beist.dao;

import com.beist.entity.Article;
import com.beist.entity.ArticleWord;
import org.springframework.data.repository.CrudRepository;
import com.beist.entity.Word;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created by jyy1996 on 2017/9/9.
 */
public interface ArticleWordRepository extends CrudRepository<ArticleWord, Long> {

    ArticleWord findByArticleAndWordAndArticleWord(Article article, Word word, String articleWord);

    //返回第一个用户需要熟悉的文章中的单词id**************************************
    @Query(value = "select top 1 * from AW where article_id = :articleId and word_id <> 0 " +
                "and word_id not in（select UW.word_id from UW where user_id_ = :userId）", nativeQuery = true)
    Long getUseeFirstAWId(@Param("articleId")Long articleid, @Param("userId")Long userid);





}
