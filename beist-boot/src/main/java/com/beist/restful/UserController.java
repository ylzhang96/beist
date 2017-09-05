package com.beist.restful;

import com.beist.entity.User;
import com.beist.service.UserService;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import com.beist.util.JWTHelper;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path="/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WordService wordService;

    // test
    @RequestMapping(path="")
    public Iterable<User> getAllUsers() {
        return userService.findAll();
    }

    @RequestMapping(path="/login", produces="application/json;charset=UTF-8")
    public String login(@RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String userPass = user.getPassword();

        Map<String, String> result = new HashMap<>();
        User userConfirmed = userService.login(userTele, userPass);

        // 如果登录者存在数据库中,返回user,否则返回null
        if(userConfirmed != null) {
            String userTeleConfirmed = userConfirmed.getUserTele();
            String userNameConfirmed = userConfirmed.getNickName();
            String userPassConfirmed = userConfirmed.getPassword();

            // 生成Token
            JWTHelper jwtHelper = new JWTHelper();
            String token = null;
            try {
                token = jwtHelper.createJWT(userTeleConfirmed, JWTHelper.SHORT_JWT_TTL);
            } catch (Exception e) {
                e.printStackTrace();
            }

            result.put("userTele", userTeleConfirmed);
            result.put("userName", userNameConfirmed);
            result.put("token", token);
            return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
        } else {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
    }

    @RequestMapping(path="/register", produces="application/json;charset=UTF-8")
    public String register(@RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String userPass = user.getPassword();
        String nickName = user.getNickName();
        String userQuestion = user.getUserQuestion();
        String userAnswer = user.getUserAnswer();
        String userRange = user.getUserRange();

        Map<String, String> result = new HashMap<>();

        if(userTele == null || userTele.equals("")) {
            result.put("errorMessage", "手机号不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(userTele.length() != 11) {
            result.put("errorMessage", "手机号必须为11位");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(nickName == null || nickName.equals("")) {
            result.put("errorMessage", "昵称不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(userPass == null || userPass.equals("")) {
            result.put("errorMessage", "密码不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(userQuestion == null || userQuestion.equals("")) {
            result.put("errorMessage", "验证问题不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(userAnswer == null || userAnswer.equals("")) {
            result.put("errorMessage", "验证问题答案不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }

        User userConfirmed = userService.findByUserTele(userTele);
        // 如果登录手机号存在，返回错误信息：手机号已存在
        if(userConfirmed != null) {
            result.put("errorMessage", "手机号已存在!");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else {
            User userNew = new User();
            userNew.setUserTele(userTele);
            userNew.setPassword(userPass);
            userNew.setNickName(nickName);
            userNew.setUserQuestion(userQuestion);
            userNew.setUserAnswer(userAnswer);
            userNew.setUserRange(userRange);
            userNew.setUserLevel("0");

            int userPlanWordNumber = 0;
            if(userRange.equals("基础")) {
                userPlanWordNumber = wordService.countWordByWordLevelEquals("基础");
            }
            else if(userRange.equals("初中")) {
                userPlanWordNumber = wordService.countWordByWordLevelEquals("初中");
            }
            else if(userRange.equals("高中")) {
                userPlanWordNumber = wordService.countWordByWordLevelEquals("高中");
            }
            else if(userRange.equals("四级")) {
                userPlanWordNumber = wordService.countWordByWordLevelEquals("四级");
            }
            else if(userRange.equals("六级")) {
                userPlanWordNumber = wordService.countWordByWordLevelEquals("六级");
            }
            userNew.setUserPlanWordNumber(userPlanWordNumber);

            userService.save(userNew);

            // 生成Token
            JWTHelper jwtHelper = new JWTHelper();
            String token = null;
            try {
                token = jwtHelper.createJWT(userTele, JWTHelper.SHORT_JWT_TTL);
            } catch (Exception e) {
                e.printStackTrace();
            }

            result.put("userTele", userTele);
            result.put("userName", nickName);
            result.put("token", token);
            return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
        }
    }

    @RequestMapping(path="/modifyNickName", produces="application/json;charset=UTF-8")
    public String modifyNickName(@RequestHeader("token") String token, @RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String nickName = user.getNickName();

        Map<String, String> result = new HashMap<>();

        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if(jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }

        if(userTele == null || userTele.equals("")) {
            result.put("errorMessage", "手机号不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        else if(nickName == null || nickName.equals("")) {
            result.put("errorMessage", "昵称不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }

        // 修改数据库
        userService.updatePersonNickNameByUserTele(nickName, userTele);
        result.put("successMessage", "修改完成");
        result.put("nickName", nickName);
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }


    // 页面载入前检查权限
    @RequestMapping(path="/check", produces="application/json;charset=UTF-8")
    public String jwtCheck(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, String> result = new HashMap<>();
        JWTHelper jwtHelper = new JWTHelper();
        try {
            if(!jwtHelper.parseJWT(token).getSubject().equals(userTele)) {
                result.put("errorMessage", "您没有权限，请登录");
                return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
            }
        } catch (Exception e) {
//            e.printStackTrace();
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }




    @RequestMapping(value = "/add/{telephone}/{password}/{nickname}")
    public User addUser(@PathVariable String telephone,
                        @PathVariable String password, @PathVariable String nickname)
    {
        User user = new User();
        user.setUserTele(telephone);
        user.setPassword(password);
        user.setNickName(nickname);
        userService.save(user);
        return user;
    }

}