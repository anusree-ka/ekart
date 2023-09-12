package com.commericial.ekart.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleUserInfo {

    private String userId;

    private String name;

    private String emailId;

    private Long tokenExp;
}
