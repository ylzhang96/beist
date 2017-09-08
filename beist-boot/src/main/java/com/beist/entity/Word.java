package com.beist.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "W")
public class Word implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "WORD_ID")
    private Long wordId;

    @Column(name = "WORD")
    private String word;

    @Column(name = "WORD_PHONETIC")
    private String wordPhonetic;

    @Column(name = "WORD_EXAMPLE")
    private String wordExample;

    @Column(name = "WORD_MEANING")
    private String wordMeaning;

    @Column(name = "WORD_MEANING_CN")
    private String wordMeaningCn;

    @Column(name = "WORD_LEVEL")
    private String wordLevel;

    // User & Word 多对多关系 中间表
    @OneToMany(mappedBy="word",cascade=CascadeType.ALL)
    private Set<UserWord> UserWordList;

    public Long getWordId() {
        return wordId;
    }

    public void setWordId(Long wordId) {
        this.wordId = wordId;
    }

    public String getWord() {
        return word;
    }

    public Set<UserWord> getUserWordList() {
        return UserWordList;
    }

    public void setUserWordList(Set<UserWord> userWordList) {
        UserWordList = userWordList;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getWordPhonetic() {
        return wordPhonetic;
    }

    public void setWordPhonetic(String wordPhonetic) {
        this.wordPhonetic = wordPhonetic;
    }

    public String getWordExample() {
        return wordExample;
    }

    public void setWordExample(String wordExample) {
        this.wordExample = wordExample;
    }

    public String getWordMeaning() {
        return wordMeaning;
    }

    public void setWordMeaning(String wordMeaning) {
        this.wordMeaning = wordMeaning;
    }

    public String getWordMeaningCn() {
        return wordMeaningCn;
    }

    public void setWordMeaningCn(String wordMeaningCn) {
        this.wordMeaningCn = wordMeaningCn;
    }

    public String getWordLevel() {
        return wordLevel;
    }

    public void setWordLevel(String wordLevel) {
        this.wordLevel = wordLevel;
    }
}
