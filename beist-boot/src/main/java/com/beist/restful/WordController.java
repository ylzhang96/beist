package com.beist.restful;

import com.beist.entity.Word;
import com.beist.service.WordService;
import com.beist.util.JSONResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.transform.Result;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping(path="/api/word")
public class WordController {

    @Autowired
    private WordService wordService;

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
