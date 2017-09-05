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

}
