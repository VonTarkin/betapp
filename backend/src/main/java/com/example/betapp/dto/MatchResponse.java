package com.example.betapp.dto;

import com.example.betapp.entity.MatchEntity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MatchResponse {

  private String country1;
  private String country2;

  private Integer scoreCountry1;
  private Integer scoreCountry2;

  private LocalDateTime createdAt;
  private LocalDateTime matchDate;

  public MatchResponse(MatchEntity match) {
    this.country1 = match.getCountry1();
    this.country2 = match.getCountry2();

    this.scoreCountry1 = match.getScoreCountry1();
    this.scoreCountry2 = match.getScoreCountry2();

    this.createdAt = match.getCreatedAt();
    this.matchDate = match.getMatchDate();
  }

  public MatchResponse(String country1, String country2, Integer scoreCountry1, Integer scoreCountry2,
                       LocalDateTime createdAt, LocalDateTime matchDate) {
    this.country1 = country1;
    this.country2 = country2;

    this.scoreCountry1 = scoreCountry1;
    this.scoreCountry2 = scoreCountry2;

    this.createdAt = createdAt;
    this.matchDate = matchDate;
  }
}
