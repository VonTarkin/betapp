package com.example.betapp.controller;

import com.example.betapp.entity.Bet;
import com.example.betapp.repository.BetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bets")
public class BetController {
  private final BetRepository repo;

  public BetController(BetRepository repo) {
    this.repo = repo;
  }

  @GetMapping
  public List<Bet> getAll() {
    return repo.findAll();
  }

  @PostMapping
  public Bet add(@RequestBody Bet bet) {
    return repo.save(bet);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable("id") Long id) {
    repo.deleteById(id);
  }

}
