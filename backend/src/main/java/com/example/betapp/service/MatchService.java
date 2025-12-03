package com.example.betapp.service;

import com.example.betapp.dto.MatchRequest;
import com.example.betapp.repository.MatchRepository;
import com.example.betapp.security.JwtService;
import org.apache.coyote.Response;
import org.aspectj.bridge.Message;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
  public ResponseEntity<String> createMatch(MatchRequest matchRequest) {
    //Todo: Do I want to do any restraints here? Matches could happen simultaneously. Atm I will abstain here, I guess.

  }
}
