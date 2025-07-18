package com.hangman.hangman_backend.controller;

import com.hangman.hangman_backend.model.GameScore;
import com.hangman.hangman_backend.service.GameScoreService;
import com.hangman.hangman_backend.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    @Autowired
    private GameService gameService;

    @Autowired
    private GameScoreService gameScoreService;

    @PostMapping("/start")
    public ResponseEntity<?> startGame() {
        return ResponseEntity.ok(gameService.startNewGame());
    }
    @PostMapping("/restart")
    public ResponseEntity<?> restartGame() {
        return ResponseEntity.ok(gameService.startNewGame());
    }

    @PostMapping("/guess")
    public ResponseEntity<?> makeGuess(@RequestParam char letter) {
        return ResponseEntity.ok(gameService.processGuess(letter));
    }

    @GetMapping("/top-scores")
    public ResponseEntity<?> getTopScores(@RequestParam Long userId) {
        return ResponseEntity.ok(gameScoreService.getTop3Scores(userId));
    }

    @PostMapping("/save-score")
    public ResponseEntity<?> saveScore(@RequestParam Long userId, @RequestParam String username, @RequestParam int score) {
        gameScoreService.saveScore(userId, username, score);
        return ResponseEntity.ok("Score saved");
    }
}
