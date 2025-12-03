package com.example.betapp.repository;

import com.example.betapp.entity.MatchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<MatchEntity, Long> {

  Optional<MatchEntity> findByCountry1AndCountry2AndMatchDate(
          String country1,
          String country2,
          LocalDateTime matchDate
  );

  List<MatchEntity> findAllByCountry1AndCountry2OrCountry2AndCountry1(
          String country1,
          String country2,
          String country2Again,
          String country1Again
  );

  List<MatchEntity> findAllByCountry1(String country1);

  List<MatchEntity> findAllByCountry2(String country2);

  List<MatchEntity> findAllByCountry1OrCountry2(String country1, String country2);

  List<MatchEntity> findAllByMatchDateBetween(LocalDateTime start, LocalDateTime end);

  List<MatchEntity> findAllByScoreCountry1IsNotNullAndScoreCountry2IsNotNull();

  List<MatchEntity> findAllByScoreCountry1IsNullAndScoreCountry2IsNull();

  boolean existsByCountry1AndCountry2AndMatchDate(
          String country1,
          String country2,
          LocalDateTime matchDate
  );
}
