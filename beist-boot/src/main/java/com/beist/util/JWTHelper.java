package com.beist.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.JSONObject;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.Date;

// 生成和解析JWT Token
// http://www.jianshu.com/p/d215e70dc1f9
public class JWTHelper {
    public static final String JWT_ID = "jwt";
    public static final String JWT_SECRET = "beistohnosatoshisakana";
    public static final int SHORT_JWT_TTL = 3 * 60 * 1000;  // 3MIN
    public static final int JWT_TTL = 60 * 60 * 1000;
    public static final int JWT_REFRESH_INTERVAL = 55 * 60 * 1000;
    public static final int JWT_REFRESH_TTL = 12 * 60 * 60 * 1000;
    public static final String BEIST_STRING = "beist";

    /*
    public static String generalSubject(String userTele, String userPass) {
        JSONObject jo = new JSONObject();
        jo.put("userTele", userTele);
        jo.put("userPass", userPass);
        return jo.toString();
    }
    */

    public SecretKey generalKey() {
        String stringKey = BEIST_STRING + JWT_SECRET;
        byte[] encodedKey = Base64.decodeBase64(stringKey);
        SecretKey key = new SecretKeySpec(encodedKey, 0, encodedKey.length, "AES");
        return key;
    }

    public String createJWT(String subject, long ttlMillis) throws Exception {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        SecretKey key = generalKey();
        JwtBuilder builder = Jwts.builder()
                .setIssuedAt(now)
                .setSubject(subject)
                .signWith(signatureAlgorithm, key);
        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }
        return builder.compact();
    }

    public Claims parseJWT(String jwt) throws Exception {
        SecretKey key = generalKey();
        Claims claims = Jwts.parser()
                .setSigningKey(key)
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }

}
