package com.beist.dao;

import com.beist.entity.User;

import java.util.List;

public interface UserDao {

    List<User> findAll();

}
