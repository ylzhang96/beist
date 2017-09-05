package com.beist.service.impl;

import com.beist.dao.WordRepository;
import com.beist.entity.Word;
import com.beist.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordServiceImpl implements WordService{

    @Autowired
    private WordRepository wordRepository;

    @Override
    public List<Word> fuzzySearchWord(String fuzzyWordName) {
        return wordRepository.fuzzySearchWord(fuzzyWordName);
    }

    @Override
    public int countWordByWordLevelEquals(String level) {
        return wordRepository.countWordByWordLevelEquals(level);
    }

    @Override
    public Long count() {
        return wordRepository.count();
    }




}
