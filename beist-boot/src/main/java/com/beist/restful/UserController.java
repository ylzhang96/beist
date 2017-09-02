package com.beist.restful;

import com.beist.dao.UserRepository;
import com.beist.entity.User;
//import com.beist.util.security.JSONResult;
import com.beist.util.JSONResult;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

    @RequestMapping(path="/test")
    public Map<String, String> LoginTest(@RequestBody User user) {
        System.out.println(user.getUserTele());
        System.out.println(user.getPassword());
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("userTele", user.getUserTele());
        return userInfo;
    }

    @RequestMapping(path="/login", produces="application/json;charset=UTF-8")
    public String Login(@RequestBody User user) {
//        System.out.println(user.getUserTele());
//        System.out.println(user.getPassword());
        // 获取前端数据
        String userTele = user.getUserTele();
        String userPass = user.getPassword();
        Map<String, String> result = new HashMap<>();
        // 如果登录者存在数据库中
        if(userTele.equals("admin") && userPass.equals("admin")) {
            String token = "tokentoken";
            String userName = "Caroline";
            result.put("userTele", userTele);
            result.put("token", token);
            result.put("userName", userName);
            return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
        } else {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
    }

    @RequestMapping(path="/register", produces="application/json;charset=UTF-8")
    public Map<String, String> Register(@RequestBody User user) {
//        System.out.println(user.getUserTele());
//        System.out.println(user.getPassword());
        // 获取前端数据
        //
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("token", user.getUserTele());
        return userInfo;
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