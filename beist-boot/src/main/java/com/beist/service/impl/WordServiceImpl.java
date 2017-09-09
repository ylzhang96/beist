package com.beist.service.impl;

import com.beist.dao.ArticleWordRepository;
import com.beist.dao.UserWordRepository;
import com.beist.dao.WordRepository;
import com.beist.entity.*;
import com.beist.service.WordService;
import com.beist.vo.WordTestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class WordServiceImpl implements WordService {

    @Autowired
    private WordRepository wordRepository;

    @Autowired
    private UserWordRepository userWordRepository;

    /************************************************/
    @Autowired
    private ArticleWordRepository articleWordRespository;

    @Override
    public UserWord saveUserWord(User user, Word word) {
        UserWord userWordOld = userWordRepository.findByUserAndWord(user, word);
        if (userWordOld == null) {
            UserWord userWord = new UserWord();
            userWord.setUser(user);
            userWord.setWord(word);
            userWord.setIsCollect("否");
            userWord.setWrongCount(1);
            userWord.setProficiency(0);
            userWord.setProficiencyUpdate(new Date());
            return userWordRepository.save(userWord);
        } else {
            return null;
        }
    }

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

    // 返回测试单词列表
    // select top 8 * from beist.dbo.W w where w.WORD_LEVEL = '六级' order by NEWID()
    // select top 4 * from beist.dbo.W w order by abs(w.WORD_ID - 11834)
    @Override
    public List<WordTestVO> testLevelWordList() {
        List<WordTestVO> wordTestVOList = new ArrayList<>();
        List<String> levelList = new ArrayList<>();
        levelList.add("基础");
        levelList.add("初中");
        levelList.add("高中");
        levelList.add("四级");
        levelList.add("六级");
        for (String level : levelList) {
            List<Word> wordList = wordRepository.findRandom8ByWordLevelEquals(level);
            for (Word word : wordList) {
                WordTestVO wordTestVO = new WordTestVO();

                String wordName = word.getWord();
                wordTestVO.setWord(wordName);

                System.out.print(word.getWordLevel());
                Long wordId = word.getWordId();
                List<Word> wordMeanList = wordRepository.findTop4MeanByWordId(wordId);
                wordTestVO.setCorrectMean(wordMeanList.get(0).getWordMeaningCn());
                wordTestVO.setFirstWrongMean(wordMeanList.get(1).getWordMeaningCn());
                wordTestVO.setSecondWrongMean(wordMeanList.get(2).getWordMeaningCn());
                wordTestVO.setThirdWrongMean(wordMeanList.get(3).getWordMeaningCn());

                wordTestVOList.add(wordTestVO);
            }
        }
        return wordTestVOList;
    }

    @Override
    public Word findFirstByWordLevelEquals(String level) {
        return wordRepository.findFirstByWordLevelEqualsOrderByWordId(level);
    }

    // 返回basic_id之后（包括basic_id）的n个单词
    @Override
    public List<Word> findTopNFromBasicId(int n, Long basicId) {
        List<Word> list = wordRepository.findTopNFromBasicId(basicId);
        if (list.size() < n)
            return list;
        else
            return list.subList(0, n);
    }

    // 返回用户需要背的单词列表
    @Override
    public List<UserWord> findUserWordsByUser(Long userId) {
        return userWordRepository.findUserWordsByUser(userId);
    }

    @Override
    public Word findByWordId(Long wordId) {
        return wordRepository.findByWordId(wordId);
    }

    @Override
    @Transactional
    public void updateWordProficiency(Long userId, Long wordId) {
        userWordRepository.updateWordProficiency(userId, wordId);
    }

    @Override
    public int countUserWordsByUser(Long userId, String userLevel) {
        return userWordRepository.countUserWordsByUser(userId, userLevel);
    }

    // 返回所有已背单词(该等级)
    @Override
    public List<UserWord> findAllUserWordsByUser(Long userId, String userLevel) {
        List<UserWord> userWordList = userWordRepository.findAllUserWordsByUser(userId);
        List<UserWord> userWordListNew = new ArrayList<>();
        if (userWordList != null) {
            for (UserWord userWord : userWordList) {
                Word word = userWord.getWord();
                if (word.getWordLevel().equals(userLevel)) {
                    userWordListNew.add(userWord);
                }
            }
            return userWordListNew;
        } else {
            return null;
        }
    }

    @Override
    public int countAllUserWordsByUser(Long userId, String userLevel) {
        List<UserWord> userWordList = userWordRepository.findAllUserWordsByUser(userId);
        int wordCount = 0;
        if (userWordList != null) {
            for (UserWord userWord : userWordList) {
                Word word = userWord.getWord();
                if (word.getWordLevel().equals(userLevel)) {
                    wordCount += 1;
                }
            }
        }
        return wordCount;
    }

    @Override
    public int countUnReciteNewWord(Long userId, String userLevel) {
        List<UserWord> userWordList = userWordRepository.countUnReciteNewWord(userId);
        int wordCount = 0;
        if (userWordList != null) {
            for (UserWord userWord : userWordList) {
                Word word = userWord.getWord();
                if (word.getWordLevel().equals(userLevel)) {
                    wordCount += 1;
                }
            }
        }
        return wordCount;
    }

    @Override
    public int countUnReciteOldWord(Long userId, String userLevel) {
        List<UserWord> userWordList = userWordRepository.countUnReciteOldWord(userId);
        int wordCount = 0;
        if (userWordList != null) {
            for (UserWord userWord : userWordList) {
                Word word = userWord.getWord();
                if (word.getWordLevel().equals(userLevel)) {
                    wordCount += 1;
                }
            }
        }
        return wordCount;
    }

    @Override
    @Transactional
    public void updateWordWrongCount(Long userId, Long wordId) {
        userWordRepository.updateWordWrongCount(userId, wordId);
    }

    @Override
    public List<UserWord> findUnReciteOldWordList(Long userId, int n, String userLevel) {
        List<UserWord> list = userWordRepository.findUnReciteOldWordList(userId, userLevel);
        if (list.size() < n)
            return list;
        else
            return list.subList(0, n);
    }

    /*******************************************************/

    @Override
    public Word findByWord(String word) {
        return wordRepository.findByWord(word);
    }


    /*****************************************************/
    @Override
    public ArticleWord saveArticleWord(Article article, Word word, Map.Entry<String, Integer> id) {
        ArticleWord articleWordOld = articleWordRespository.findByArticleAndWordAndArticleWord(article,word,id.getKey());
        if (articleWordOld == null ) {
            ArticleWord articleWord = new ArticleWord();
            articleWord.setArticle(article);
            articleWord.setWord(word);
            articleWord.setArticleWord(id.getKey());
            articleWord.setWordCount(id.getValue());
            return articleWordRespository.save(articleWord);
        } else {
            return null;
        }
    }

    /****************************************************/
    public UserWord save(UserWord userword){
        return userWordRepository.save(userword);
    }

    public List<ArticleWord> getWordListByArticleIdOutOfUW(Long articleId, Long userId) {
        return articleWordRespository.getWordListByArticleIdOutOfUW(articleId, userId);
    }
}
