package com.commericial.ekart.controller;

import com.commericial.ekart.model.SignupRequest;
import com.commericial.ekart.model.UserDetails;
import com.commericial.ekart.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;


    @Autowired
    private HttpServletResponse response;


    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignupRequest signupRequest){

        this.userService.signup(signupRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<Long> getUserIdFromToken(@RequestHeader(required = false) String Authorization) {

        return new ResponseEntity<>(this.userService.getUserIdFromToken(Authorization), HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/profile")
    public ResponseEntity<UserDetails> getUserDetails(@PathVariable Long userId) {

        return new ResponseEntity<>(this.userService.getUserDetails(userId), HttpStatus.OK);
    }

    @PutMapping("/user/{userId}/profile")
    public ResponseEntity updateUserDetails(@PathVariable Long userId, @RequestBody UserDetails userDetails) {

        this.userService.updateUserDetails(userId, userDetails);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
