package com.beist.dao;

import com.beist.entity.User;
import com.beist.entity.UserWord;
import com.beist.entity.Word;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserWordRepository extends CrudRepository<UserWord, Long> {

    UserWord findByUserAndWord(User user, Word word);

    void deleteByUserAndWord(User user, Word word);

    // 返回今天需背单词列表
    @Query(value = "select * from UW where user_id_ = :userId and wrong_count = 1",nativeQuery = true)
    List<UserWord> findUserWordsByUser(@Param("userId") Long userId);

    // test
    @Query(value = "select * from UW where user_id_ = 15",nativeQuery = true)
    List<UserWord> testFind();

    // 修改熟练度
    @Modifying
    @Query(value = "update UW set PROFICIENCY = PROFICIENCY + 1, WRONG_COUNT = 0 where user_id_ = :userId and word_id = :wordId", nativeQuery = true)
    void updateWordProficiency(@Param("userId") Long userId, @Param("wordId") Long wordId);

    // 返回今天需背单词数
    @Query(value = "select count(*) from UW,W where UW.word_id = W.word_id and " +
            "W.word_level = :userLevel and user_id_ = :userId and wrong_count = 1",nativeQuery = true)
    int countUserWordsByUser(@Param("userId") Long userId, @Param("userLevel") String userLevel);

    // 返回总共已背单词列表
    @Query(value = "select * from UW where user_id_ = :userId and proficiency = 5",nativeQuery = true)
    List<UserWord> findAllUserWordsByUser(@Param("userId") Long userId);

    // 统计wrong_count = 1/ Proficiency=0的未背新词个数
    @Query(value = "select * from UW where user_id_ = :userId and wrong_count = 1 and proficiency = 0",nativeQuery = true)
    List<UserWord> countUnReciteNewWord(@Param("userId") Long userId);

    // 统计wrong_count = 1/ Proficiency!=0的未背旧词个数
    @Query(value = "select * from UW where user_id_ = :userId and wrong_count = 1 and proficiency != 0",nativeQuery = true)
    List<UserWord> countUnReciteOldWord(@Param("userId") Long userId);

    // 选一些旧词
    @Query(value = "select * from UW, W where UW.word_id = w.word_id and w.word_level = :userLevel and " +
            "user_id_ = :userId and wrong_count = 0 and proficiency != 5 order by proficiency", nativeQuery = true)
    List<UserWord> findUnReciteOldWordList(@Param("userId") Long userId, @Param("userLevel") String userLevel);

    // 设一些单词的wrong_count
    @Modifying
    @Query(value = "update UW set WRONG_COUNT = 1 where user_id_ = :userId and word_id = :wordId", nativeQuery = true)
    void updateWordWrongCount(@Param("userId") Long userId, @Param("wordId") Long wordId);
}
