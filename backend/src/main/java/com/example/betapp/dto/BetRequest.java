package com.example.betapp.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BetRequest {

  @NotNull
  private Long matchId;

  @NotNull
  private Long userId;

  @NotNull
  private BigDecimal odds;

  @NotNull
  private BigDecimal amount;
}
