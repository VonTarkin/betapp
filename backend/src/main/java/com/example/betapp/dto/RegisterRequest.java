package com.example.betapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
  private String username;
  private String email;
  private String phone;
  private String password;
}
