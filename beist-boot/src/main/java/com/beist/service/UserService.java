package com.beist.service;

import com.beist.entity.User;

public interface UserService {

    Iterable<User> findAll();
    void save(User user);
    User login(String userTele, String userPass);
    User findByUserTele(String userTele);
    void updatePersonNickNameByUserTele(String nickName, String userTele);
    int updateUserRangeByUserTele(String userRange, String userTele);


}
