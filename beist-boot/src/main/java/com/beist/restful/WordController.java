package com.beist.restful;

import com.beist.entity.User;
import com.beist.entity.UserWord;
import com.beist.entity.Word;
import com.beist.service.UserService;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path="/api/word")
public class WordController {

    @Autowired
    private UserService userService;

    @Autowired
    private WordService wordService;

    @Autowired
    private UserController userController;

    @RequestMapping("/test")
    public String test() {
        return "Success";
    }

    // 获取用户单词列表
    @RequestMapping("/getWordList")
    public String getWordList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<Long>> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(-1, "您没有权限，请登录", result);
        }

        // 获取用户今日单词
        User user = userService.findByUserTele(userTele);
        List<UserWord> userWordList = wordService.findUserWordsByUser(user.getUserId());

        List<Long> wordList = new ArrayList<>();
        for(UserWord userWord : userWordList) {
            Word word = userWord.getWord();
            wordList.add(word.getWordId());
        }
        result.put("wordList", wordList);
        return JSONResult.fillResultString(wordList.size(), JSONResult.MESSAGE_OK, result);
    }

    // 一个个读单词
    @RequestMapping("/getWordByWordId")
    public String getWordByWordId(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele,
                                  @RequestHeader("wordId") String wordId) {
        Map<String, String> result = new HashMap<>();

        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, "您没有权限，请登录", result);
        }
//        System.out.println(wordId);
        Long wordIdLong = Long.parseLong(wordId);
        Word word = wordService.findByWordId(wordIdLong);
//        result.put("wordId", word.getWordId());
        result.put("word", word.getWord());
        result.put("wordExample", word.getWordExample());
        result.put("wordPhonetic", word.getWordPhonetic());
        result.put("wordMeaning", word.getWordMeaning());
        result.put("wordMeaningCn", word.getWordMeaningCn());
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    @RequestMapping("/updateWordProficiency")
    public String updateWordProficiency(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele,
                                        @RequestHeader("wordId") String wordId) {
        Map<String, Long> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, "您没有权限，请登录", result);
        }

        User user = userService.findByUserTele(userTele);
        Long wordIdLong = Long.parseLong(wordId);
        wordService.updateWordProficiency(user.getUserId(), wordIdLong);
        result.put("wordId", wordIdLong);
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    // 模糊查询
    @RequestMapping(path="/search", produces="application/json;charset=UTF-8")
    public String wordFuzzySearch (@RequestBody Word fuzzyWord) {
//        System.out.println(fuzzyWord.getWord());
        String fuzzyWordName = '%' + fuzzyWord.getWord() + '%';
        List<Word> wordList = wordService.fuzzySearchWord(fuzzyWordName);

        Map<String, Word> result = new HashMap<>();
        int wordNum = 0;

        if(wordList.isEmpty()) {
//            result.put("errorMessage", "没有找到单词!");
            return JSONResult.fillResultString(-1, JSONResult.MESSAGE_FAIL, result);
        } else {
            result.put("word1", wordList.get(0));
            wordNum = 1;
            if(wordList.size() > 2) {
                result.put("word2", wordList.get(1));
                result.put("word3", wordList.get(2));
                wordNum = 3;
            } else if(wordList.size() > 1) {
                result.put("word2", wordList.get(1));
                wordNum = 2;
            }
//            result.put("successMessage", "完成");
            return JSONResult.fillResultString(wordNum, JSONResult.MESSAGE_OK, result);
        }
    }



}
