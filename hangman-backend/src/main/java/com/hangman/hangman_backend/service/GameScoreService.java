package com.hangman.hangman_backend.service;

import com.hangman.hangman_backend.dto.GameScoreRepository;
import com.hangman.hangman_backend.model.GameScore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameScoreService {
    @Autowired
    private GameScoreRepository gameScoreRepo;

    public void saveScore(Long userId, String username, int score) {
        GameScore gameScore = new GameScore(null, userId, username, score);
        gameScoreRepo.save(gameScore);
    }

    public List<GameScore> getTop3Scores(Long userId) {
        return gameScoreRepo.findTop3ByUserIdOrderByScoreDesc(userId);
    }
}
