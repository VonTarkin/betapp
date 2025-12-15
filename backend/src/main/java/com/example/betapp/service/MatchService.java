package com.example.betapp.service;

import com.example.betapp.dto.MatchRequest;
import com.example.betapp.dto.MatchResponse;
import com.example.betapp.dto.UpdateMatchScoreRequest;
import com.example.betapp.entity.MatchEntity;
import com.example.betapp.repository.MatchRepository;
import com.example.betapp.security.JwtService;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
public class MatchService {

  private final MatchRepository matchRepository;
  private final MessageSource messageSource;
  private final JwtService jwtService;

  public MatchService(MatchRepository matchRepository, MessageSource messageSource, JwtService jwtService) {
    this.matchRepository = matchRepository;
    this.messageSource = messageSource;
    this.jwtService = jwtService;
  }

  @Transactional
  public ResponseEntity<String> createMatch(MatchRequest req) {
    Locale locale = LocaleContextHolder.getLocale();
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    if (auth == null || !auth.isAuthenticated()) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
              .body(messageSource.getMessage("ERROR_LACK_OF_PERMISSION", null, locale));
    }
    boolean isAdmin = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch("ROLE_ADMIN"::equals);

    if (!isAdmin) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN)
              .body(messageSource.getMessage("ERROR_LACK_OF_PERMISSION", null, locale));
    }

    MatchEntity newMatch = MatchEntity.builder()
            .country1(req.getCountry1())
            .country2(req.getCountry2())
            .odds(req.getOdds())
            .matchDate(req.getMatchDate())
            .scoreCountry1(null)
            .scoreCountry2(null)
            .build();

    matchRepository.save(newMatch);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(messageSource.getMessage("SUCCESS_MATCH_CREATED", null, locale));
  }

  public ResponseEntity<List<MatchResponse>> getAllMatches() {
    List<MatchEntity> matches = matchRepository.findAll();
    List<MatchResponse> response = matches.stream()
            .map(MatchResponse::new)
            .toList();

    return ResponseEntity.ok(response);
  }

  public ResponseEntity<?> getMatchById(Long id) {
    Locale locale = LocaleContextHolder.getLocale();

    MatchEntity match = matchRepository.findById(id).orElse(null);

    if (match == null) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
              messageSource.getMessage("ERROR_MATCH_NOT_FOUND", null, locale));
    }

    MatchResponse response = new MatchResponse(match);
    return ResponseEntity.ok(response);
  }


  @Transactional
  public ResponseEntity<String> updateMatchScore(Long id, UpdateMatchScoreRequest req) {
    Locale locale = LocaleContextHolder.getLocale();
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    String role = auth.getAuthorities()
            .stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse(null);

    if(!Objects.equals(role, "ROLE_ADMIN")) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(messageSource.getMessage("ERROR_LACK_OF_PERMISSION",null, locale));
    }


    return matchRepository.findById(id)
            .map(match -> {
              match.setScoreCountry1(req.getScoreCountry1());
              match.setScoreCountry2(req.getScoreCountry2());
              matchRepository.save(match);

              return ResponseEntity.ok((messageSource.getMessage("SUCCESS_MATCH_EDITED",null, locale)));
            })
            .orElseGet(() ->
                    ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(messageSource.getMessage("ERROR_MATCH_NOT_FOUND",null, locale)));
  }

  @Transactional
  public ResponseEntity<String> deleteMatch(Long id) {
    Locale locale = LocaleContextHolder.getLocale();
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();

    String role = auth.getAuthorities()
            .stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse(null);

    if(!Objects.equals(role, "ROLE_ADMIN")) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND)
              .body(messageSource.getMessage("ERROR_LACK_OF_PERMISSION",null, locale));
    }

    return matchRepository.findById(id)
            .map(match -> {
              matchRepository.delete(match);
              return ResponseEntity.ok((messageSource.getMessage("SUCCESS_MATCH_DELETED",null, locale)));
            })
            .orElseGet(() ->
                    ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(messageSource.getMessage("ERROR_MATCH_NOT_FOUND",null, locale)));
  }
}
