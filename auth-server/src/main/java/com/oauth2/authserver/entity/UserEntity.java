package com.oauth2.authserver.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_details")
public class UserEntity {

    public UserEntity() {
    }

    @Id
    @Column(name = "user_id")
    @GeneratedValue(generator = "user_id_seq_gen", strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "user_id_seq_gen", sequenceName = "user_id_seq", schema = "ekart",allocationSize = 1, initialValue = 1000)
    private Long userId;

    @Column(name = "user_name")
    private String username;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "password")
    private String password;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Long getContactNo() {
        return contactNo;
    }

    public void setContactNo(Long contactNo) {
        this.contactNo = contactNo;
    }

    @Column(name = "address")
    private String address;

    @Column(name = "contact_no")
    private Long contactNo;
}
