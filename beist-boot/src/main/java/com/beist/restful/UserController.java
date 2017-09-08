package com.beist.restful;

import com.beist.entity.User;
import com.beist.entity.UserWord;
import com.beist.entity.Word;
import com.beist.service.UserService;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import com.beist.util.JWTHelper;
import com.beist.vo.WordTestVO;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WordService wordService;

    // token未过期的用户，应该允许直接转到myPage页面吧？
    // 默认User背诵天数

    // test
    @RequestMapping(path = "")
    public Iterable<User> getAllUsers() {
        return userService.findAll();
    }

    // 登录
    @RequestMapping(path = "/login", produces = "application/json;charset=UTF-8")
    public String login(@RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String userPass = user.getPassword();

        Map<String, String> result = new HashMap<>();
        User userConfirmed = userService.login(userTele, userPass);

        // 如果登录者存在数据库中,返回user,否则返回null
        if (userConfirmed != null) {
            String userTeleConfirmed = userConfirmed.getUserTele();
            String userNameConfirmed = userConfirmed.getNickName();
            String userPassConfirmed = userConfirmed.getPassword();

            // 如果是第一次登录
            SimpleDateFormat fmt=new SimpleDateFormat("yyyy-MM-dd");
            if(!fmt.format(userConfirmed.getLastLoginDate()).toString().equals(fmt.format(new Date()).toString())) {
                int todayNewWord = userConfirmed.getWordNumberPerDay() / 3;   // 3
                int todayOldWord = userConfirmed.getWordNumberPerDay() - todayNewWord;  // 7
                Long basicIdSet = userConfirmed.getBasicWordId();;

                // 新词逻辑
                int unReciteNewWordNum = wordService.countUnReciteNewWord(userConfirmed.getUserId(), userConfirmed.getUserRange());
                System.out.println(wordService.countUnReciteNewWord(userConfirmed.getUserId(), userConfirmed.getUserRange()));
                if(unReciteNewWordNum < userConfirmed.getWordNumberPerDay()) {  // 新词数小于今天要背的数的时候
                    if (unReciteNewWordNum < todayNewWord) {
                        // 继续存
                        // 多取一个
                        todayNewWord = todayNewWord - unReciteNewWordNum;

                        Long basicId = userConfirmed.getBasicWordId();
                        if (basicId != -1) {  // 仍然有新词
                            List<Word> wordList = wordService.findTopNFromBasicId(todayNewWord + 1, basicId);
                            int wordListLength = wordList.size() - 1;
                            System.out.println(wordListLength);
                            for (int i = 0; i < wordListLength; i++) {
                                wordService.saveUserWord(userConfirmed, wordList.get(i));
                            }
                            if (wordListLength == todayNewWord) {
                                basicIdSet = wordList.get(wordListLength).getWordId();
                                userService.updateBasicWordIdByUserTele(basicIdSet, userConfirmed.getUserTele());
                            } else {
                                todayOldWord = todayOldWord + todayNewWord - wordListLength;
                                userService.updateBasicWordIdByUserTele(-1L, userConfirmed.getUserTele());
                            }
                        } else {  // 没有的话读的旧词多一点
                            todayOldWord += todayNewWord;
                        }
                    } else {
                        todayOldWord = todayOldWord - unReciteNewWordNum + todayNewWord;
                    }



                    // 旧词逻辑
                    int unReciteOldWordNum = wordService.countUnReciteOldWord(userConfirmed.getUserId(), userConfirmed.getUserRange());
                    if (unReciteOldWordNum < todayOldWord) {
                        // 再选一点旧词设为今日要背的单词
                        todayOldWord = todayOldWord - unReciteOldWordNum;
                        List<UserWord> userWordList = wordService.findUnReciteOldWordList(userConfirmed.getUserId(), todayOldWord, userConfirmed.getUserRange());
                        int userWordListLength = userWordList.size();
                        for (int i = 0; i < userWordListLength; i++) {
                            Word word = userWordList.get(i).getWord();
                            wordService.updateWordWrongCount(userConfirmed.getUserId(), word.getWordId());
                        }
                        if (userWordListLength < todayOldWord && userConfirmed.getBasicWordId() != -1L) {
                            int todayAddNewWord = todayOldWord - userWordListLength;
                            List<Word> wordList = wordService.findTopNFromBasicId(todayAddNewWord + 1, basicIdSet);
                            int wordListLength = wordList.size() - 1;
                            for (int i = 0; i < wordListLength; i++) {
                                wordService.saveUserWord(userConfirmed, wordList.get(i));
                            }
                            if (wordListLength == todayAddNewWord) {
                                userService.updateBasicWordIdByUserTele(wordList.get(wordListLength).getWordId(),
                                        userConfirmed.getUserTele());
                            } else {
                                userService.updateBasicWordIdByUserTele(-1L, userConfirmed.getUserTele());
                            }
                        }
                    }
                }
                System.out.print("hhhhh");
                userService.updateLastLoginDateByUserTele(new Date(), userTeleConfirmed);
            }

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

    // 注册
    @RequestMapping(path = "/register", produces = "application/json;charset=UTF-8")
    public String register(@RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String userPass = user.getPassword();
        String nickName = user.getNickName();
        String userQuestion = user.getUserQuestion();
        String userAnswer = user.getUserAnswer();
        String userRange = user.getUserRange();

        Map<String, String> result = new HashMap<>();

        if (userTele == null || userTele.equals("")) {
            result.put("errorMessage", "手机号不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (userTele.length() != 11) {
            result.put("errorMessage", "手机号必须为11位");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (nickName == null || nickName.equals("")) {
            result.put("errorMessage", "昵称不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (userPass == null || userPass.equals("")) {
            result.put("errorMessage", "密码不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (userQuestion == null || userQuestion.equals("")) {
            result.put("errorMessage", "验证问题不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (userAnswer == null || userAnswer.equals("")) {
            result.put("errorMessage", "验证问题答案不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }

        User userConfirmed = userService.findByUserTele(userTele);
        // 如果登录手机号存在，返回错误信息：手机号已存在
        if (userConfirmed != null) {
            result.put("errorMessage", "手机号已存在!");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else {
            // 存入用户表
            User userNew = new User();
            userNew.setUserTele(userTele);
            userNew.setPassword(userPass);
            userNew.setNickName(nickName);
            userNew.setUserQuestion(userQuestion);
            userNew.setUserAnswer(userAnswer);
            userNew.setUserRange(userRange);
            userNew.setUserLevel("零基础");
            int wordNumberPerDay = 10;
            userNew.setWordNumberPerDay(wordNumberPerDay); // 暂时不提供接口改
            userNew.setLastLoginDate(new Date());
            Long basicId = wordService.findFirstByWordLevelEquals(userRange).getWordId();
            userNew.setBasicWordId(basicId);

            int userPlanWordNumber = wordService.countWordByWordLevelEquals(userRange);
            userNew.setUserPlanWordNumber(userPlanWordNumber);

            User userNewIn = userService.save(userNew);

            // 初始化用户单词表
            // 多取一个
            List<Word> wordList = wordService.findTopNFromBasicId(wordNumberPerDay+1, basicId);
            for(int i = 0; i < wordNumberPerDay; i++) {
                wordService.saveUserWord(userNewIn, wordList.get(i));
            }

            basicId = wordList.get(wordNumberPerDay).getWordId();
            userService.updateBasicWordIdByUserTele(basicId, userNewIn.getUserTele());

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

    // 修改用户昵称
    @RequestMapping(path = "/modifyNickName", produces = "application/json;charset=UTF-8")
    public String modifyNickName(@RequestHeader("token") String token, @RequestBody User user) {
        // 获取前端数据
        String userTele = user.getUserTele();
        String nickName = user.getNickName();

        Map<String, String> result = new HashMap<>();

        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }

        if (userTele == null || userTele.equals("")) {
            result.put("errorMessage", "手机号不能为空");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else if (nickName == null || nickName.equals("")) {
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
    @RequestMapping(path = "/check", produces = "application/json;charset=UTF-8")
    public String jwtCheck(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, String> result = new HashMap<>();
        JWTHelper jwtHelper = new JWTHelper();
        try {
            if (!jwtHelper.parseJWT(token).getSubject().equals(userTele)) {
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

    // 查看用户选择的难度
    @RequestMapping(path = "/findRangeAndLevel", produces = "application/json;charset=UTF-8")
    public String findRange(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, String> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        User user = userService.findByUserTele(userTele);
        if (user == null) {
            result.put("errorMessage", "用户不存在");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else {
            String userLevel = user.getUserLevel();
            String userRange = user.getUserRange();
            int userPlanWordNumber = user.getUserPlanWordNumber();
            result.put("userRange", userRange);
            result.put("userLevel", userLevel);
            result.put("userPlanWordNumber", String.valueOf(userPlanWordNumber));
            return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
        }
    }

    // 查看用户需要背的单词数
    @RequestMapping(path = "/findWordNum")
    public String findWordNum(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, String> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        User user = userService.findByUserTele(userTele);
        if (user == null) {
            result.put("errorMessage", "用户不存在");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        } else {
            int userPlanWordCount = user.getUserPlanWordNumber();
            int allUserWordCount = wordService.countAllUserWordsByUser(user.getUserId(), user.getUserRange());
            int todayUserWordCount = user.getWordNumberPerDay();
            int rate = allUserWordCount * 100 / userPlanWordCount;
            int todayUserHasCount = user.getWordNumberPerDay() - wordService.countUserWordsByUser(user.getUserId(), user.getUserRange());
            result.put("userPlanWordCount", String.valueOf(userPlanWordCount));
            result.put("allUserWordCount", String.valueOf(allUserWordCount));
            result.put("todayUserWordCount", String.valueOf(todayUserWordCount));
            result.put("rate", String.valueOf(rate));
            result.put("todayUserHasCount", String.valueOf(todayUserHasCount));
            return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
        }
    }

    // 修改用户选择的难度
    @RequestMapping(path = "/modifyRange")
    public String modifyRange(@RequestHeader("token") String token,
                              @RequestHeader("userTele") String userTele, @RequestBody User user) {
        String userRange = user.getUserRange();
        Map<String, String> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        // 修改数据库
        int userPlanWordNumber = userService.updateUserRangeByUserTele(userRange, userTele);
        result.put("successMessage", "修改完成");
        result.put("userRange", userRange);
        result.put("userPlanWordNumber", String.valueOf(userPlanWordNumber));

        Long basicId = wordService.findFirstByWordLevelEquals(userRange).getWordId();
        userService.updateBasicWordIdByUserTele(basicId, userTele);

        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);

    }

    // 修改用户水平
    @RequestMapping(path = "/modifyLevel")
    public String modifyLevel(@RequestHeader("token") String token,
                              @RequestHeader("userTele") String userTele, @RequestBody User user) {
        String userLevel = user.getUserLevel();

        System.out.print(userLevel);
        Map<String, String> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            result.put("errorMessage", "您没有权限，请登录");
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, result);
        }
        // 修改数据库
        userService.updateUserLevelByUserTele(userLevel, userTele);
        result.put("successMessage", "修改完成");
        result.put("userLevel", userLevel);
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    // 测试用户水平
    @RequestMapping(path = "/testLevel")
    public String testLevel(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<WordTestVO>> result = new HashMap<>();

        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, JSONResult.MESSAGE_FAIL, "您没有权限，请登录");
        }

        result.put("wordList", wordService.testLevelWordList());
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    // testTestLevelWordList
    // test
    @RequestMapping(path = "/testtest")
    public String testTestLevelWordList() {
        Map<String, List<WordTestVO>> result = new HashMap<>();
        result.put("wordList", wordService.testLevelWordList());
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    @RequestMapping(value = "/add/{telephone}/{password}/{nickname}")
    public User addUser(@PathVariable String telephone,
                        @PathVariable String password, @PathVariable String nickname) {
        User user = new User();
        user.setUserTele(telephone);
        user.setPassword(password);
        user.setNickName(nickname);
        userService.save(user);
        return user;
    }

}