package com.example.betapp.dto;

import com.example.betapp.entity.BetEntity;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class BetResponse {

  private long id;

  private long matchId;

  private long userId;

  private BigDecimal odds;

  private BigDecimal amount;

  private LocalDateTime createdAt;

  public BetResponse(BetEntity entity) {
    this.id = entity.getId();
    this.matchId = entity.getMatchId();
    this.userId = entity.getUserId();
    this.odds = entity.getOdds();
    this.amount = entity.getAmount();
    this.createdAt = entity.getCreatedAt();
  }

  public BetResponse(long id, long matchId, long userId, BigDecimal odds, BigDecimal amount, LocalDateTime createdAt) {
    this.id = id;
    this.matchId = matchId;
    this.userId = userId;
    this.odds = odds;
    this.amount = amount;
    this.createdAt = createdAt;
  }
}
