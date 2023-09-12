package com.commericial.ekart.service;

import com.commericial.ekart.config.GoogleTokenVerifier;
import com.commericial.ekart.entity.UserEntity;
import com.commericial.ekart.model.SignupRequest;
import com.commericial.ekart.model.UserDetails;
import com.commericial.ekart.repo.UserRepo;
import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    GoogleTokenVerifier googleTokenVerifier;

    public void signup(SignupRequest signupRequest) {

        UserEntity userEntity = UserEntity.builder().password(signupRequest.getPassword()).emailId(signupRequest.getEmailId()).build();

        this.userRepo.save(userEntity);

    }

    public Long getUserIdFromToken(String token) {

        //GoogleUserInfo googleUserInfo =  this.googleTokenVerifier.verifyToken(token);

        if (token.contains("Bearer")) {
            token = token.substring(7);
        }

        try {
            JWT jwt = JWTParser.parse(token);
            Map<String, Object> claims = jwt.getJWTClaimsSet().getClaims();

            UserEntity userEntity = this.userRepo.findByEmailId(claims.get("sub").toString());
            return userEntity.getUserId();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }

    }

    public UserDetails getUserDetails(Long userId) {

        UserEntity userEntity = this.userRepo.findById(userId).get();
        return UserDetails.builder().userId(userEntity.getUserId()).username(userEntity.getUsername()).emailId(userEntity.getEmailId()).address(userEntity.getAddress()).contactNo(userEntity.getContactNo()).build();
    }

    public void updateUserDetails(Long userId, UserDetails userDetails) {

        UserEntity userEntity = this.userRepo.findById(userId).get();
        userEntity.setUsername(userDetails.getUsername());
        userEntity.setAddress(userDetails.getAddress());
        userEntity.setContactNo(userDetails.getContactNo());

        this.userRepo.save(userEntity);

    }
}
