package com.example.betapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false, length = 50)
  private String country1;

  @NotBlank
  @Column(nullable = false, length = 50)
  private String country2;

  @NotNull
  @Column(nullable = false)
  private BigDecimal odds;

  //Can be null cause we'll make it work later lol.
  @Column
  private Integer scoreCountry1;

  @Column
  private Integer scoreCountry2;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @NotNull
  @Column(name = "match_date", nullable = false)
  private LocalDateTime matchDate;
}
