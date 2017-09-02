package com.beist.util;

import org.json.JSONObject;

public class JSONResult {
    public static Integer STATUS_OK = 0;
    public static Integer STATUS_FAIL = 1;

    public static String MESSAGE_OK = "SUCCESS";
    public static String MESSAGE_FAIL = "FAILED";

    public static String fillResultString(Integer status, String message, Object result){
        JSONObject jsonObject = new JSONObject(){{
            put("status", status);   // 状态
            put("message", message);    // 错误信息
            put("result", result);    // 结果集
        }};
        return jsonObject.toString();
    }
}
