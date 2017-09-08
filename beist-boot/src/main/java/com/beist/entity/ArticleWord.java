package com.beist.entity;


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Data
@Entity
@Table(name = "AW")
public class ArticleWord implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ARTICLE_WORD_ID")
    private Long articleWordId;

    @Column(name = "ARTICLE_WORD")
    private String articleWord;

    @Column(name = "WORD_COUNT")
    private Integer wordCount;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "ARTICLE_ID", unique = true)
    private Article article;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "WORD_ID", unique = true)
    private Word word;

    public Long getArticleWordId() {
        return articleWordId;
    }

    public void setArticleWordId(Long articleWordId) {
        this.articleWordId = articleWordId;
    }

    public String getArticleWord() {
        return articleWord;
    }

    public void setArticleWord(String articleWord) {
        this.articleWord = articleWord;
    }

    public Integer getWordCount() {
        return wordCount;
    }

    public void setWordCount(Integer wordCount) {
        this.wordCount = wordCount;
    }


    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }
}
