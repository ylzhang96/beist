package com.beist.dao;

import com.beist.entity.Word;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WordRepository extends CrudRepository<Word, Long> {

    /*
         CrudRepository 接口继承于 Repository 接口，并新增了如下方法 
         long count();  
         boolean exists(Integer arg0); 
          
         <S extends StudentPO> S save(S arg0); 
         <S extends StudentPO> Iterable<S> save(Iterable<S> arg0); 
      
         void delete(Integer arg0); 
         void delete(Iterable<? extends StudentPO> arg0); 
         void delete(StudentPO arg0); 
         void deleteAll(); 
      
         StudentPO findOne(Integer arg0); 
         Iterable<StudentPO> findAll(); 
         Iterable<StudentPO> findAll(Iterable<Integer> arg0); 
          
    */

    // 模糊查询
    @Query("select w from Word w where w.word like :fuzzyWordName order by w.wordId desc")
    List<Word> fuzzySearchWord(@Param("fuzzyWordName")String fuzzyWordName);

    // 统计level个数
    int countWordByWordLevelEquals(String level);

    // 返回某个level的随机8个单词
    @Query(value = "select top 8 * from W w where w.WORD_LEVEL = :wordLevel order by newid()", nativeQuery = true)
    List<Word> findRandom8ByWordLevelEquals(@Param("wordLevel") String wordLevel);

    // 返回该单词的四个选项的单词,第一个肯定为正确答案
    @Query(value = "select top 4 * from W w order by abs(w.WORD_ID - :wordId)", nativeQuery = true)
    List<Word> findTop4MeanByWordId(@Param("wordId") Long wordId);

    // 返回每个level的第一个单词的word_id
    @Query(value = "select top 1 * from W w where w.WORD_LEVEL = :level order by w.WORD_ID", nativeQuery = true)
    Word findFirstByWordLevelEqualsOrderByWordId(@Param("level") String level);


    // 如果不够呢？
    // http://blog.csdn.net/cuiyaoqiang/article/details/51240955
    @Query(value = "select * from W w where w.WORD_ID >= :basicId order by (w.WORD_ID - :basicId)", nativeQuery = true)
    List<Word> findTopNFromBasicId(@Param("basicId") Long basicId);

    Word findByWordId(Long wordId);

    // 通过单词查找所属难度类型
    Word findByWord(String word);

}
