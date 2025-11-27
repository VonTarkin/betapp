package com.example.betapp.security;

import com.example.betapp.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

  // TODO: Move to application properties - Min length - 32 chars.
  private static final String SECRET_KEY = "my_super_secret_jwt_key_that_is_very_secure_123";

  // 1 Hour, so I do remember lol
  private static final long EXPIRATION_MS = 60 * 60 * 1000;

  // Makes a key from the string.
  private SecretKey getSigningKey() {
    byte[] keyBytes = SECRET_KEY.getBytes(StandardCharsets.UTF_8);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  // And does a JWT token. Magic.
  public String generateToken(UserEntity user) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + EXPIRATION_MS);

    return Jwts.builder()
            .subject(user.getEmail())
            .claim("role", user.getRole().getName().name())
            .issuedAt(now)
            .expiration(expiry)
            .signWith(getSigningKey())
            .compact();
  }

  //Gets email (subject) from token
  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  // Gets smth from token
  public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = extractAllClaims(token);
    return claimsResolver.apply(claims);
  }

  // Get all claims
  private Claims extractAllClaims(String token) {
    return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }

  private boolean isTokenExpired(String token) {
    Date expiration = extractClaim(token, Claims::getExpiration);
    return expiration.before(new Date());
  }

  public boolean isTokenValid(String token, String usernameFromUserDetails) {
    final String username = extractUsername(token);
    return username.equals(usernameFromUserDetails) && !isTokenExpired(token);
  }
}
