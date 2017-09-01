package com.beist.restful;

import com.beist.dao.UserRepository;
import com.beist.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path="/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(path="")
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @RequestMapping(value = "/add/{telephone}/{password}/{nickname}")
    public User addUser(@PathVariable String telephone,
                        @PathVariable String password, @PathVariable String nickname)
    {
        User user = new User();
        user.setUserTele(telephone);
        user.setPassword(password);
        user.setNickName(nickname);
        userRepository.save(user);
        return user;
    }


    @RequestMapping(path="/user")
    public String testUser() {
        return "hello user";
    }
}