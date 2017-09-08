package com.beist.restful;

import com.beist.entity.*;
import com.beist.service.ArticleService;
import com.beist.service.UserService;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import com.beist.util.UpdateTableA;
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



   /*
    // 获取用户推荐文章列表
    @RequestMapping("/getArticleList")
    public String getArticleList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<Long>> result = new HashMap<>();
        // 获取与用户水平相同的文章列表
        User user = userService.findByUserTele(userTele);
        List<Article> ArticleList = articleService.findArticleListByArticleLevel(user.getUserLevel());

        List<Long> articleList = new ArrayList<>();
        for(Article article : ArticleList) {
            Article article1 = article.getArticle();
            articleList.add(article1.getArticleId());
        }

        result.put("articleList", articleList);
        return JSONResult.fillResultString(articleList.size(), JSONResult.MESSAGE_OK, result);
    }

    // 获取用户文章列表
    @RequestMapping("/getUserArticleList")
    public String getUserArticleList(@RequestHeader("token") String token, @RequestHeader("userTele") String userTele) {
        Map<String, List<Long>> result = new HashMap<>();
        // 获取用户的文章列表
        User user = userService.findByUserTele(userTele);
        List<UserArticle> userArticleList = articleService.findUserArticlesByUser(user.getUserId());

        List<Long> articleList = new ArrayList<>();
        for(UserArticle userarticle : userArticleList) {
            Article article = userarticle.getArticle();
            articleList.add(article.getArticleId());
        }

        result.put("articleList", articleList);
        return JSONResult.fillResultString(articleList.size(), JSONResult.MESSAGE_OK, result);
    }

    //获取文章内容
    public ArrayList<String> getArticle(Article article) throws IOException {
        String articlePath = "E:/练习/beist/beist-master/test";
        InputStream is = null;
        is = new FileInputStream(articlePath + "/article" + article.getArticlePath());
        BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
        ArrayList<String>  strArray = new ArrayList<String> ();
        for (String a = reader.readLine(); a != null; a = reader.readLine())
            strArray.add(a);
        return strArray;
    }

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
