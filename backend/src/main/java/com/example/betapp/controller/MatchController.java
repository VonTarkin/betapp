package com.example.betapp.controller;

import com.example.betapp.dto.MatchRequest;
import com.example.betapp.dto.UpdateMatchScoreRequest;
import com.example.betapp.entity.MatchEntity;
import com.example.betapp.entity.UserEntity;
import com.example.betapp.service.MatchService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matches")
public class MatchController {

  private final MatchService matchService;

  public MatchController(MatchService matchService) {
    this.matchService = matchService;
  }

  @PostMapping("/create")
  public ResponseEntity<String> createMatch(@RequestBody MatchRequest request) {
    return matchService.createMatch(request);
  }

  @GetMapping
  public ResponseEntity<?> getAllMatches() {
    return matchService.getAllMatches();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getMatchById(@PathVariable Long id) {
    return matchService.getMatchById(id);
  }

  @PutMapping("/{id}")
  public ResponseEntity<String> updateMatch(
          @PathVariable Long id,
          @RequestBody UpdateMatchScoreRequest request
  ) {
    return  matchService.updateMatchScore(id, request);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteMatch(@PathVariable Long id) {
    return matchService.deleteMatch(id);
  }
}
