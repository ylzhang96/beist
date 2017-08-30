package com.beist.dao.impl;

import com.beist.dao.UserDao;
import com.beist.entity.User;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<User> findAll() {
//        Criteria criteria = sessionFactory.getCurrentSession().createCriteria(User.class);
//        List<User> userList = criteria.list();
//        for(User user : userList)
//            System.out.println(user.getNickName());
        List<User> userList = new ArrayList<>();
        User user1 = new User();
        user1.setUserId(123);
        user1.setUserTele("1234");
        user1.setPassword("5678");
        userList.add(user1);
        System.out.print(user1.getUserId());
        return userList;
    }
}
