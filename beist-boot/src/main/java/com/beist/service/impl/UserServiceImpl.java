package com.beist.service.impl;

import com.beist.dao.UserRepository;
import com.beist.dao.WordRepository;
import com.beist.entity.User;
import com.beist.entity.Word;
import com.beist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WordRepository wordRepository;

    @Override
    public Iterable<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public User login(String userTele, String userPass) {
        User user = userRepository.findByUserTele(userTele);
        if(user != null && user.getPassword().equals(userPass)) {
            return user;
        } else {
            return null;
        }
    }

    @Override
    public User findByUserTele(String userTele) {
        return userRepository.findByUserTele(userTele);
    }

    @Override
    @Transactional
    public void updatePersonNickNameByUserTele(String nickName, String userTele){
        userRepository.updatePersonNickNameByUserTele(nickName, userTele);
    }

    @Override
    @Transactional
    public int updateUserRangeByUserTele(String userRange, String userTele) {
        userRepository.updateUserRangeByUserTele(userRange, userTele);
        int userPlanWordNumber = wordRepository.countWordByWordLevelEquals(userRange);
        userRepository.updateUserPlanWordNumberByUserTele(userPlanWordNumber, userTele);
        return userPlanWordNumber;
    }
}
