package com.beist.service;

import com.beist.entity.Word;

import java.util.List;

public interface WordService {
    List<Word> fuzzySearchWord(String fuzzyWordName);
    int countWordByWordLevelEquals(String level);
    Long count();

}
