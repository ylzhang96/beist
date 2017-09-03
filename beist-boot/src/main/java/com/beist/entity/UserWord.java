package com.beist.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Data
@Entity
@Table(name = "UW")
public class UserWord implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "USER_WORD_ID")
    private Long userWordId;

    @Column(name = "PROFICIENCY")
    private String proficiency;

    @Column(name = "IS_COLLECT")
    private String isCorrect;

    @Column(name = "WRONG_COUNT")
    private Integer wrongCount;

    @Column(name = "PROFICIENCY_UPDATE")
    private Date proficiencyUpdate;

    // 外键


}

