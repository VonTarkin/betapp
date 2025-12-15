/*package com.example.betapp.controller;

import com.example.betapp.dto.BetRequest;
import com.example.betapp.dto.MatchRequest;
import com.example.betapp.dto.MatchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bets")
public class BetController {

  private final BetService betService;

  public BetController(BetService betService) {
    this.betService = betService;
  }

  @PostMapping("/create")
  public ResponseEntity<String> createMatch(@RequestBody BetRequest request) {
    return betService.createBet(request);
  }

  @GetMapping
  public ResponseEntity<List<MatchResponse>> getAllBets() {
    return betService.getAllBets();
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getBetById(@PathVariable Long id) {
    return betService.getBetById(id);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteBet(@PathVariable Long id) {
    return betService.deleteBet(id);
  }
}
*/