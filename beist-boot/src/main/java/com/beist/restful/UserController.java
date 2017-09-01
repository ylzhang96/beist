package com.beist.restful;

import com.beist.dao.UserRepository;
import com.beist.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path="/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(path="/test")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(path="/user")
    public String testUser() {
        return "hello user";
    }
}