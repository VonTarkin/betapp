package com.example.betapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {

  private String token;
  private String username;
  private String email;
  private String role;
  private String message;

  public LoginResponse(String token, String username, String email, String role, String message) {
    this.token = token;
    this.username = username;
    this.email = email;
    this.role = role;
    this.message = message;
  }
}
