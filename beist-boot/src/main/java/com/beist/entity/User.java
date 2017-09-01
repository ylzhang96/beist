package com.beist.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "beist_user")
public class User implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "USER_TELE")
    private String userTele;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "NICK_NAME")
    private String nickName;

    @Column(name = "USER_ICON")
    private String userIcon;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserTele() {
        return userTele;
    }

    public void setUserTele(String userTele) {
        this.userTele = userTele;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getUserIcon() {
        return userIcon;
    }

    public void setUserIcon(String userIcon) {
        this.userIcon = userIcon;
    }
}