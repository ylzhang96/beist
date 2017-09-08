package com.beist.service;

import com.beist.entity.User;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface UserService {

    Iterable<User> findAll();
    User save(User user);
    User login(String userTele, String userPass);
    User findByUserTele(String userTele);
    void updatePersonNickNameByUserTele(String nickName, String userTele);
    void updateUserLevelByUserTele(String userLevel, String userTele);
    int updateUserRangeByUserTele(String userRange, String userTele);
    void updateWordNumberPerDayByUserTele(int wordNumberPerDay, String userTele);
    void updateLastLoginDateByUserTele(Date lastLoginDate, String userTele);
    void updateBasicWordIdByUserTele(Long basicWordId, String userTele);

}
