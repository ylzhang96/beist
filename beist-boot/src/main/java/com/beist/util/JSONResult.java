package com.beist.util;

import org.json.JSONObject;

public class JSONResult {
    public static final Integer STATUS_OK = 0;
    public static final Integer STATUS_FAIL = 1;

    public static final String MESSAGE_OK = "SUCCESS";
    public static final String MESSAGE_FAIL = "FAILED";

    public static String fillResultString(Integer status, String message, Object result){
        JSONObject jsonObject = new JSONObject(){{
            put("status", status);   // 状态
            put("message", message);    // 错误信息
            put("result", result);    // 结果集
        }};
        return jsonObject.toString();
    }
}
