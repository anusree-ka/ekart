package com.oauth2.authserver.service;

import com.oauth2.authserver.entity.UserEntity;
import com.oauth2.authserver.model.CustomUserDetails;
import com.oauth2.authserver.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {

        UserEntity user = userRepo.findByEmailId(emailId);

        if (user != null) {
            CustomUserDetails customUserDetails = new CustomUserDetails();
            customUserDetails.setUserName(user.getEmailId());
            customUserDetails.setPassword(user.getPassword());

            return customUserDetails;
        }
        throw new UsernameNotFoundException(emailId);
    }
}
