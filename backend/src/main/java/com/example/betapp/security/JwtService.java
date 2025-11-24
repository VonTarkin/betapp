package com.example.betapp.security;

import com.example.betapp.entity.UserEntity;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

  // TODO: Move to application properties - Min length - 32 chars.
  private static final String SECRET_KEY = "my_super_secret_jwt_key_that_is_very_secure_123";

  // 1 Hour, so I do remember lol
  private static final long EXPIRATION_MS = 60 * 60 * 1000;

  // Makes a key from the string.
  private Key getSigningKey() {
    byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  // And does a JWT token. Magic.
  public String generateToken(UserEntity user) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + EXPIRATION_MS);

    return Jwts.builder()
            .subject(user.getEmail())   // or user.getUsername()
            .claim("role", user.getRole().getName().name())
            .issuedAt(now)
            .expiration(expiry)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
  }
}
