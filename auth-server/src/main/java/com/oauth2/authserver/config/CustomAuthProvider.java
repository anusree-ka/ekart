package com.oauth2.authserver.config;

import com.oauth2.authserver.entity.UserEntity;
import com.oauth2.authserver.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Objects;

@Component
public class CustomAuthProvider implements AuthenticationProvider {

    @Autowired
    private UserRepo endUserRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String emailId = authentication.getName();
        String password = authentication.getCredentials().toString();

        UserEntity userEntity = this.endUserRepo.findByEmailId(emailId);
        if (Objects.isNull(userEntity)) {
            throw new BadCredentialsException("No user found!!");
        } else {


            if (password.equals( userEntity.getPassword())) {
                return new UsernamePasswordAuthenticationToken(emailId, password, Collections.emptyList());
            } else {
                throw new BadCredentialsException("Invalid credentials!!");
            }

        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
