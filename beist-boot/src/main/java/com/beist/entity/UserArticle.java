package com.beist.entity;

/**
 * Created by jyy1996 on 2017/9/7.
 */


import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "UA")
public class UserArticle implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_ARTICLE_ID")
    private Long userArticleId;

    @Column(name = "STATE")
    private String state;

    @Column(name = "READ_TIME")
    private Integer readTime;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "USER_ID_", unique = true)
    private User user;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "ARTICLE_ID", unique = true)
    private Article article;

    public Long getUserArticleId(){
        return userArticleId;
    }

    public void setUserArticleId(Long userArticleId){
        this.userArticleId = userArticleId;
    }

    public String getState(){
        return state;
    }

    public void setState(String state){
        this.state = state;
    }

    public Integer getReadTime(){
        return readTime;
    }

    public void setReadTime(Integer readTime){
        this.readTime = readTime;
    }


    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }


}
