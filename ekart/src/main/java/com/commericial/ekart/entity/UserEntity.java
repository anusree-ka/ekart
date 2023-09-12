package com.commericial.ekart.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_details")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

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

    @Column(name = "address")
    private String address;

    @Column(name = "contact_no")
    private Long contactNo;
}
