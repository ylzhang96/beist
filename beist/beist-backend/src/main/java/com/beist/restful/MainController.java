package com.beist.restful;

import com.beist.entity.User;
import com.beist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/")

public class MainController {

    @Autowired
    private UserService userService;

    @RequestMapping("/")
    public String home(){
        return "index";
    }

    @RequestMapping("/json")
    public List<User> json(){
        return userService.getUserList();
    }

}