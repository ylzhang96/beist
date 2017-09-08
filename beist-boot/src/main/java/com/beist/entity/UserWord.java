package com.beist.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "UW")
public class UserWord implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_WORD_ID")
    private Long userWordId;

    @Column(name = "PROFICIENCY")
    private int proficiency;

    @Column(name = "IS_COLLECT")
    private String isCollect;

    @Column(name = "WRONG_COUNT")
    private Integer wrongCount;

    @Column(name = "PROFICIENCY_UPDATE")
    private Date proficiencyUpdate;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "USER_ID_", unique = true)
    private User user;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "WORD_ID", unique = true)
    private Word word;

    public Long getUserWordId() {
        return userWordId;
    }

    public void setUserWordId(Long userWordId) {
        this.userWordId = userWordId;
    }

    public int getProficiency() {
        return proficiency;
    }

    public void setProficiency(int proficiency) {
        this.proficiency = proficiency;
    }

    public String getIsCollect() {
        return isCollect;
    }

    public void setIsCollect(String isCollect) {
        this.isCollect = isCollect;
    }

    public Integer getWrongCount() {
        return wrongCount;
    }

    public void setWrongCount(Integer wrongCount) {
        this.wrongCount = wrongCount;
    }

    public Date getProficiencyUpdate() {
        return proficiencyUpdate;
    }

    public void setProficiencyUpdate(Date proficiencyUpdate) {
        this.proficiencyUpdate = proficiencyUpdate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }
}

