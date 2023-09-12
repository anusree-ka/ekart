package com.commericial.ekart.config;

import com.commericial.ekart.model.GoogleUserInfo;
import com.commericial.ekart.util.SecurityConstants;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;

@Slf4j
public class TokenAuthFilter  {

    @Autowired
    private GoogleTokenVerifier googleTokenVerifier;

    //@Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader(SecurityConstants.JWT_HEADER);
        if (!ObjectUtils.isEmpty(jwt)) {

            try {

                GoogleUserInfo googleUserInfo = this.googleTokenVerifier.verifyToken(jwt);

                response.setHeader("tokenExp",googleUserInfo.getTokenExp().toString());

                Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(googleUserInfo.getEmailId(), null, Collections.emptyList());

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                throw new BadCredentialsException("Invalid token !!!");
            }

        }
        filterChain.doFilter(request, response);
    }

   // @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return Arrays.asList("/signup","login", "/error", "/products", "/product/**").contains(request.getServletPath());
    }
}
