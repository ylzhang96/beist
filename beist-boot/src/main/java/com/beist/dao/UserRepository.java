package com.beist.dao;

import com.beist.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Long> {

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

    // 通过用户手机号查找
    User findByUserTele(String userTele);

    // 修改用户昵称
    @Modifying
    @Query("update User u set nickName = :nickName where userTele =:userTele")
    void updatePersonNickNameByUserTele(@Param("nickName")String nickName, @Param("userTele")String userTele);

    // 修改用户难度
    @Modifying
    @Query("update User u set userRange = :userRange where userTele =:userTele")
    void updateUserRangeByUserTele(@Param("userRange")String userRange, @Param("userTele")String userTele);

    // 修改用户水平
    @Modifying
    @Query("update User u set userLevel = :userLevel where userTele =:userTele")
    void updateUserLevelByUserTele(@Param("userLevel")String userLevel, @Param("userTele")String userTele);

    // 修改用户要背单词数
    @Modifying
    @Query("update User u set userPlanWordNumber = :userPlanWordNumber where userTele =:userTele")
    void updateUserPlanWordNumberByUserTele(@Param("userPlanWordNumber")Integer userPlanWordNumber, @Param("userTele")String userTele);

}
