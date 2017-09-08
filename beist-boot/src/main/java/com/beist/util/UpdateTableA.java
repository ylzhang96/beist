package com.beist.util;


import com.beist.entity.Article;
import com.beist.entity.Word;
import com.beist.service.ArticleService;
import com.beist.service.WordService;


import java.io.*;
import java.util.*;
import java.util.List;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/article")
public class UpdateTableA {
    @Autowired
    private WordService wordService;

    @Autowired
    private ArticleService articleService;

    // update
    // 没事别轻易干
    @RequestMapping(path = "/update")
    public void update() {
        UpdateTableA();
    }

    public void UpdateTableA() {
        InputStream is = null;
        InputStream article_file = null;
        try {
            String articlePath ="C:/ylzhang/beist/beist-spider/Articles/";
            is = new FileInputStream(articlePath+"result.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            // 读取一行，存储于字符串列表中
            for (String line = reader.readLine(); line != null; line = reader.readLine()) {
                line = line.trim();
                String[] articleInfo = new String[]{"","","","",""};
                String articleLevel = "";   //记录文章难度类型
                //articleInfo[0]--文章标题
                //articleInfo[1]--时间
                //articleInfo[2]--字数
                //articleInfo[3]--type类型
                //articleInfo[4]--路径
                //读入文章信息行
                articleInfo = line.split("\\|");
                Article article = new Article();
                article.setArticleTitle(articleInfo[0].trim());

                article.setArticleType(articleInfo[3].trim());
                article.setArticlePath(articleInfo[4].trim());
                article.setArticleWordNumber(Integer.parseInt(articleInfo[2].trim()));
                //article.setArticleDate(articleInfo[1]);
                article.setArticleDate(new Date());
                articleService.save(article);



                article_file = new FileInputStream(articlePath + "/article" + articleInfo[4].trim());


                // 读入文章内容进行难度判定
                // 参考：Java 统计各个单词的个数并排序 - Bad Boy - CSDN博客  http://blog.csdn.net/pzhtpf/article/details/7536798
                String article_body = "";
                BufferedReader reader2 = new BufferedReader(new InputStreamReader(article_file, "UTF-8"));
                String a = reader2.readLine();
                for ( a = reader2.readLine();a != null; a = reader2.readLine()){
                    article_body += a;
                }
                article_body = article_body.toLowerCase();

                Map<String,Integer> map=new HashMap<String,Integer>();//用于统计各个单词的个数

                StringTokenizer token=new StringTokenizer(article_body);//这个类会将字符串分解成一个个的标记
                while(token.hasMoreTokens()){                      //循环遍历
                    String word=token.nextToken("()&*#$%@‘’, ?.!:\"\"''\n");  //按照,空格 ? . : "" '' \n等分割
                    if(map.containsKey(word)){     //HashMap不允许重复的key，利用这个特性，可统计单词的个数
                        int count=map.get(word);
                        if(word.matches("[0-9]{1,}") == false && word.length() > 1)	//word是非数字,长度大于一的单词
                            map.put(word, count+1);     //如果HashMap已有这个单词，则设置它的数量加1
                    }
                    else
                    if(word.matches("[0-9]{1,}") == false && word.length() > 1)
                        map.put(word, 1);          //如果没有这个单词，则新填入，数量为1
                }

                //循环查找每个出现单词的类型，储存各类型出现次数，并存入文章单词表
                int level_jichu = 0;
                int level_chuzhong = 0;
                int level_gaozhong = 0;
                int level_siji = 0;
                int level_liuji = 0;
                List<Map.Entry<String, Integer>> infoIds = new ArrayList<Map.Entry<String, Integer>>(map.entrySet());
                for (int i = 0; i < infoIds.size(); i++) {   //输出
                    Entry<String, Integer> id = infoIds.get(i);
                    //System.out.println(id.getKey()+":"+id.getValue());
                    Word w = wordService.findByWord(id.getKey());
                    if(w != null) {
                        if (w.getWordLevel().equals("基础")) {
                            level_jichu += id.getValue();
                            //写入文章单词表操作
                            wordService.saveArticleWord(article,w,id);
                        }
                        else if (w.getWordLevel().equals("初中")) {
                            level_chuzhong += id.getValue();
                            //写入文章单词表操作
                            wordService.saveArticleWord(article,w,id);
                        }
                        else if (w.getWordLevel().equals("高中")) {
                            level_gaozhong += id.getValue();
                            //写入文章单词表操作
                            wordService.saveArticleWord(article,w,id);
                        }
                        else if (w.getWordLevel().equals("四级")) {
                            level_siji += id.getValue();
                            //写入文章单词表操作
                            wordService.saveArticleWord(article,w,id);
                        }
                        else if (w.getWordLevel().equals("六级")) {
                            level_liuji += id.getValue();
                            //写入文章单词表操作
                            wordService.saveArticleWord(article,w,id);
                        }
                    }
                    else {
                        //写入文章单词表操作，单词编号为0
                        w = wordService.findByWord("not found");
                        wordService.saveArticleWord(article,w,id);

                    }
                }
                int total = level_jichu + level_chuzhong + level_gaozhong + level_siji + level_liuji;
                if(level_liuji > total*0.1) //六级单词占比超过10%
                    articleLevel = "六级";
                else if(level_siji > total*0.1) //四级单词占比超过10%
                    articleLevel = "四级";
                else if(level_gaozhong > total*0.2) //高中单词占比超过20%
                    articleLevel = "高中";
                else if(level_chuzhong > total*0.2) //初中单词占比超过20%
                    articleLevel = "初中";
                else
                    articleLevel = "基础";



                //写入文章难度信息
                article.setArticleLevel(articleLevel);
                articleService.save(article);


            }

        }catch (FileNotFoundException fnfe){
            fnfe.printStackTrace();
        }catch (IOException ioe){
            ioe.printStackTrace();
        } finally {
            try {
                if (is != null) {
                    is.close();
                    is = null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }



    }



}
