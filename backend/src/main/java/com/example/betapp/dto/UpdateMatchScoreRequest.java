package com.example.betapp.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMatchScoreRequest {

  @NotNull
  private Integer scoreCountry1;

  @NotNull
  private Integer scoreCountry2;
}
