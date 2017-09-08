package com.beist.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "A")
public class Article implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ARTICLE_ID")
    private Long articleId;

    @Column(name = "ARTICLE_TITLE")
    private String articleTitle;

    @Column(name = "ARTICLE_TYPE")
    private String articleType;

    @Column(name = "ARTICLE_PATH")
    private String articlePath;

    @Column(name = "ARTICLE_LEVEL")
    private String articleLevel;

    @Column(name = "ARTICLE_WORD_NUMBER")
    private Integer articleWordNumber;

    @Column(name = "ARTICLE_DATE")
    private Date articleDate;

    // User & Article 多对多关系 中间表
    @OneToMany(mappedBy="article",cascade=CascadeType.ALL)
    private Set<UserArticle> UserArticleList;

    // Article & Word 多对多关系 中间表
    @OneToMany(mappedBy="article",cascade=CascadeType.ALL)
    private Set<ArticleWord> ArticleWordList;

    public Set<ArticleWord> getArticleWordList() {
        return ArticleWordList;
    }

    public void setArticleWordList(Set<ArticleWord> articleWordList) {
        ArticleWordList = articleWordList;
    }


    public Long getArticleId() {
        return articleId;
    }

    public void setArticleId(Long articleId) {
        this.articleId = articleId;
    }

    public String getArticleTitle() {
        return articleTitle;
    }

    public void setArticleTitle(String articleTitle) {
        this.articleTitle = articleTitle;
    }

    public String getArticleType() {
        return articleType;
    }

    public void setArticleType(String articleType) {
        this.articleType = articleType;
    }

    public String getArticlePath() {
        return articlePath;
    }

    public void setArticlePath(String articlePath) {
        this.articlePath = articlePath;
    }

    public String getArticleLevel() {
        return articleLevel;
    }

    public void setArticleLevel(String articleLevel) {
        this.articleLevel = articleLevel;
    }

    public Integer getArticleWordNumber() {
        return articleWordNumber;
    }

    public void setArticleWordNumber(Integer articleWordNumber) {
        this.articleWordNumber = articleWordNumber;
    }

    public Date getArticleDate() {
        return articleDate;
    }

    public void setArticleDate(Date articleDate) {
        this.articleDate = articleDate;
    }

}
