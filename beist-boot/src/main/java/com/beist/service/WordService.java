package com.beist.service;

import com.beist.entity.*;
import com.beist.vo.WordTestVO;

import java.util.List;
import java.util.Map;

public interface WordService {
    List<Word> fuzzySearchWord(String fuzzyWordName);
    int countWordByWordLevelEquals(String level);
    Long count();
    List<WordTestVO> testLevelWordList();
    UserWord saveUserWord(User user, Word word);
    Word findFirstByWordLevelEquals(String level);
    List<Word> findTopNFromBasicId(int n, Long basicId);
    List<UserWord> findUserWordsByUser(Long userId);
    Word findByWordId(Long wordId);
    void updateWordProficiency(Long userId, Long wordId);
    int countUserWordsByUser(Long userId, String userLevel);
    List<UserWord> findAllUserWordsByUser(Long userId, String userLevel);
    int countAllUserWordsByUser(Long userId, String userLevel);
    int countUnReciteNewWord(Long userId, String userLevel);
    int countUnReciteOldWord(Long userId, String userLevel);
    void updateWordWrongCount(Long userId, Long wordId);
    List<UserWord> findUnReciteOldWordList(Long userId, int n, String userLevel);
    /**********************************************/

    Word findByWord(String word);
    ArticleWord saveArticleWord(Article article, Word word, Map.Entry<String, Integer> id);
    UserWord save(UserWord userword);
}
