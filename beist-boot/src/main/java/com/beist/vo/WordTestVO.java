package com.beist.vo;

import java.io.Serializable;

public class WordTestVO implements Serializable{
    private String word;
    private String correctMean;
    private String firstWrongMean;
    private String secondWrongMean;
    private String thirdWrongMean;

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getCorrectMean() {
        return correctMean;
    }

    public void setCorrectMean(String correctMean) {
        this.correctMean = correctMean;
    }

    public String getFirstWrongMean() {
        return firstWrongMean;
    }

    public void setFirstWrongMean(String firstWrongMean) {
        this.firstWrongMean = firstWrongMean;
    }

    public String getSecondWrongMean() {
        return secondWrongMean;
    }

    public void setSecondWrongMean(String secondWrongMean) {
        this.secondWrongMean = secondWrongMean;
    }

    public String getThirdWrongMean() {
        return thirdWrongMean;
    }

    public void setThirdWrongMean(String thirdWrongMean) {
        this.thirdWrongMean = thirdWrongMean;
    }
}
