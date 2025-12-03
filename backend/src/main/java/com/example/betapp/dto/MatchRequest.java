package com.example.betapp.dto;

import lombok.Getter;
import lombok.Setter;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@Setter
public class MatchRequest {

  @NotBlank
  private String country1;

  @NotBlank
  private String country2;

  private Integer scoreCountry1;

  private Integer scoreCountry2;

  @NotNull
  private LocalDateTime matchDate;
}
