package com.commericial.ekart.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDetails {

    private Long userId;

    private String username;

    private String emailId;

    private String password;

    private String address;

    private Long contactNo;



}
