package com.commericial.ekart.config;

import com.commericial.ekart.exception.BadRequestException;
import com.commericial.ekart.model.GoogleUserInfo;
import com.commericial.ekart.util.SecurityConstants;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.LocalDate;
import java.util.Collections;

@Component
public class GoogleTokenVerifier {

    private static final HttpTransport transport = new NetHttpTransport();
    private static final JsonFactory jsonFactory = new GsonFactory();

    public GoogleUserInfo verifyToken(String token) {

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory).setAudience(Collections.singletonList(SecurityConstants.CLIENT_ID)).build();

        GoogleIdToken idToken = null;
        try {
            idToken = verifier.verify(token);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            //            String userId = payload.getSubject();
            //            String email = payload.getEmail();
            //            boolean emailVerified = payload.getEmailVerified();
            //            String name = (String) payload.get("name");
            //            String pictureUrl = (String) payload.get("picture");
            //            String locale = (String) payload.get("locale");
            //            String familyName = (String) payload.get("family_name");
            //            String givenName = (String) payload.get("given_name");

            return GoogleUserInfo.builder().userId(payload.getSubject()).name((String) payload.get("name")).emailId(payload.getEmail()).tokenExp(payload.getExpirationTimeSeconds()).build();

        } else {
            throw new BadRequestException("Invalid token!!");
        }

    }

}
