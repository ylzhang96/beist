package com.beist.restful;

import com.beist.entity.*;
import com.beist.service.ArticleService;
import com.beist.service.UserService;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import com.beist.util.PathConstants;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/article")
public class ArticleController {
    @Autowired
    private UserService userService;

    @Autowired
    private WordService wordService;

    @Autowired
    private ArticleService articleService;

    @Autowired
    private UserController userController;

    // 获取用户各阅读文章数量
    @RequestMapping("/countArticle")
    public String countArticle(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, Integer> result = new HashMap<>();
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, "您没有权限，请登录", result);
        }

        // 获取用户的文章列表
        User user = userService.findByUserTele(userTele);
        List<UserArticle> userArticleList = articleService.findUserArticlesByUser(user.getUserId());

        int wordRemindingNum = 0;
        int preparingNum = 0;
        int hasReadNum = 0;

        for(UserArticle userArticle : userArticleList) {
            String state = userArticle.getState();
            if(state.equals("熟悉单词")) {
                wordRemindingNum += 1;
            } else if(state.equals("正在阅读")) {
                preparingNum += 1;
            } else if(state.equals("已阅读")) {
                hasReadNum += 1;
            }
        }

        int rate = hasReadNum * 100 / 235;

        result.put("wordRemindingNum", wordRemindingNum);
        result.put("preparingNum", preparingNum);
        result.put("hasReadNum", hasReadNum);
        result.put("rate", rate);
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);

    }

    // 获取用户推荐文章列表
    @RequestMapping("/getArticleList")
    public String getArticleList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<String>> result = new HashMap<>();
        // 操作前也要查看Token
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(-1, "您没有权限，请登录", result);
        }

        // 获取与用户水平相同的文章列表
        User user = userService.findByUserTele(userTele);
        List<Article> ArticleList = articleService.findArticleListByArticleLevel(user.getUserRange());
        if(ArticleList.size() >= 6)
            ArticleList = ArticleList.subList(0, 6);
        List<String> articleIdList = new ArrayList<>();
        List<String> articleTitleList = new ArrayList<>();
        for(Article article : ArticleList) {
            Long articleId = article.getArticleId();
            articleIdList.add(String.valueOf(articleId));
            String articleTitle = article.getArticleTitle();
            articleTitleList.add(articleTitle);
        }

        result.put("articleIdList", articleIdList);
        result.put("articleTitleList", articleTitleList);
        return JSONResult.fillResultString(articleIdList.size(), JSONResult.MESSAGE_OK, result);
    }

    // 获取用户文章列表
    @RequestMapping("/getUserArticleList")
    public String getUserArticleList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<String>> result = new HashMap<>();
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(-1, "您没有权限，请登录", result);
        }

        // 获取用户的文章列表
        User user = userService.findByUserTele(userTele);
        List<UserArticle> userArticleList = articleService.findUserArticlesByUser(user.getUserId());

        if(userArticleList.size() > 5)
            userArticleList = userArticleList.subList(0, 5);

        List<String> articleIdList = new ArrayList<>();
        List<String> articleTitleList = new ArrayList<>();
        for(UserArticle userarticle : userArticleList) {
            Article article = userarticle.getArticle();
            Long articleId = article.getArticleId();
            articleIdList.add(String.valueOf(articleId));
            String articleTitle = article.getArticleTitle();
            articleTitleList.add(articleTitle);
        }

        result.put("articleIdList", articleIdList);
        result.put("articleTitleList", articleTitleList);
        return JSONResult.fillResultString(articleIdList.size(), JSONResult.MESSAGE_OK, result);
    }

    // 用户文章表没有或者用户单词表为熟悉单词，则返回单词列表
    // 用户文章表显示准备阅读或者用户单词表显示已阅读，则返回文章列表
    @RequestMapping("/getArticleListOrWordList")
    public String getArticleListOrWordList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele,
                                           @RequestHeader("articleId") String articleId) {
        Map<String, List<String>> result = new HashMap<>();
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(-1, "您没有权限，请登录", result);
        }
        Long articleIdLong = Long.parseLong(articleId);
        Article article = articleService.findArticleByArticleId(articleIdLong);
        User user = userService.findByUserTele(userTele);
        UserArticle userArticle = articleService.findByUserAndArticle(user, article);
        if(userArticle == null) {
            UserArticle userArticleNew = new UserArticle();
            userArticleNew.setArticle(article);
            userArticleNew.setUser(user);
            userArticleNew.setState("熟悉单词");
            UserArticle userArticle1 = articleService.save(userArticleNew);
            List<String> wordIdList = new ArrayList<>();
            List<ArticleWord> wordIdListLong = wordService.getWordListByArticleIdOutOfUW(userArticle1.getArticle().getArticleId(),
                    userArticle1.getUser().getUserId());
            for(ArticleWord wordIdLong : wordIdListLong) {
                if(wordIdLong.getWord().getWordLevel().equals(user.getUserRange())) {
                    String wordId = String.valueOf(wordIdLong.getWord().getWordId());
                    wordIdList.add(wordId);
                }

            }
            result.put("wordIdList", wordIdList);
            return JSONResult.fillResultString(1, JSONResult.MESSAGE_OK, result);
        } else if(userArticle.getState().equals("熟悉单词")) {
            List<String> wordIdList = new ArrayList<>();
            List<ArticleWord> wordIdListLong = wordService.getWordListByArticleIdOutOfUW(userArticle.getArticle().getArticleId(),
                    userArticle.getUser().getUserId());
            for(ArticleWord wordIdLong : wordIdListLong) {
                if(wordIdLong.getWord().getWordLevel().equals(user.getUserRange())) {
                    String wordId = String.valueOf(wordIdLong.getWord().getWordId());
                    wordIdList.add(wordId);
                }
            }
            result.put("wordIdList", wordIdList);
            return JSONResult.fillResultString(1, JSONResult.MESSAGE_OK, result);
        } else {
            List<String> articleInfo = new ArrayList<>();
            articleInfo.add(article.getArticleTitle());
            articleInfo.add(article.getArticleLevel());
            articleInfo.add(String.valueOf(article.getArticleWordNumber()));
            result.put("articleInfo", articleInfo);
            List<String> articleTotal;
            try {
                articleTotal = getArticle(article);
                articleTotal = articleTotal.subList(1, articleTotal.size());
                result.put("article", articleTotal);
            } catch (IOException e) {
                e.printStackTrace();
            }
            return JSONResult.fillResultString(0, JSONResult.MESSAGE_OK, result);
        }
    }

    @RequestMapping("/getArticleInfoByArticleId")
    public String getArticleByArticleId(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele,
                                        @RequestHeader("articleId") String articleId) {
        Map<String, String> result = new HashMap<>();
        JSONObject jsonObject = new JSONObject(userController.jwtCheck(token, userTele));
        if (jsonObject.getInt("status") == 1) {
            return JSONResult.fillResultString(JSONResult.STATUS_FAIL, "您没有权限，请登录", result);
        }
        Long articleIdLong = Long.parseLong(articleId);
        Article article = articleService.findArticleByArticleId(articleIdLong);
        result.put("articleName", article.getArticleTitle());
        result.put("articleLevel", article.getArticleLevel());
        result.put("articleNum", String.valueOf(article.getArticleWordNumber()));
        try {
            List<String> articleTotal = getArticle(article);
            String articleAbstract = articleTotal.get(1);
            result.put("articleAbstract", articleAbstract);
//            result.put("articleTotalList", articleTotal);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return JSONResult.fillResultString(JSONResult.STATUS_OK, JSONResult.MESSAGE_OK, result);
    }

    //获取文章内容
    public ArrayList<String> getArticle(Article article) throws IOException {
        String articlePath = PathConstants.ARTICLE_PATH;
        InputStream is = null;
        is = new FileInputStream(articlePath + "/article" + article.getArticlePath());
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        ArrayList<String>  strArray = new ArrayList<String> ();
        for (String a = reader.readLine(); a != null; a = reader.readLine())
            strArray.add(a);
        return strArray;
    }

    /*
    //获取用户需要熟悉的一个文章单词（单词未在用户单词表中）
    public Word getWord(User user, Article article) {

        Word w = wordService.findByWordId(articleService.getUseeFirstAWId(article.getArticleId(),user.getUserId()));

        return w;
    }

    //将用户返回的单词存入用户单词表
    public void insertUserWord(User user, Word word) {
        // 存入用户单词表
        UserWord uword = new UserWord();
        uword.setUser(user);
        uword.setWord(word);
        uword.setProficiency(1);        //熟练度置1
        uword.setIsCorrect("");         //??
        uword.setWrongCount(0);         //错误次数为0
        uword.setProficiencyUpdate(new Date());

        UserWord uwordnewIn = wordService.save(uword);

    }

    */



}
