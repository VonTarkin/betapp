package com.example.betapp.dto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserResponse {
  String username;
  String email;
  LocalDateTime createdAt;

  public UserResponse(String username, String email, LocalDateTime createdAt) {
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
  }
}
