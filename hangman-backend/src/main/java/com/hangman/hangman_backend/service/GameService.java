package com.hangman.hangman_backend.service;

import com.hangman.hangman_backend.dto.GameScoreRepository;
import com.hangman.hangman_backend.model.GameScore;
import com.hangman.hangman_backend.model.GameState;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Data
public class GameService {

    private GameState currentGame;

    @Autowired
    private WordService wordService;
    @Autowired
    private GameScoreRepository gameScoreRepository;

//    public void saveScore(Long userId, String username, int score) {
//        GameScore gameScore = new GameScore();
//        gameScore.setUserId(userId);
//        gameScore.setUsername(username);
//        gameScore.setScore(score);
//        gameScoreRepository.save(gameScore);
//    }

    public Map<String, Object> startNewGame() {
        String word = wordService.getRandomWordFromGemini();
        currentGame = new GameState(word);

        Map<String, Object> response = new HashMap<>();
        response.put("maskedWord", currentGame.getMaskedWord());
        response.put("chancesLeft", currentGame.getChancesLeft());
        return response;
    }
    private List<Integer> userTopScores = new ArrayList<>();

    private void updateUserScores(int newScore) {
        userTopScores.add(newScore);
        userTopScores.sort(Collections.reverseOrder());
        if (userTopScores.size() > 3) {
            userTopScores = userTopScores.subList(0, 3);
        }
    }
//
//    public List<GameScore> getTop3Scores(Long userId) {
//        return gameScoreRepository.findTop3ByUserIdOrderByScoreDesc(userId);
//    }

    public Map<String, Object> processGuess(char letter) {
        Map<String, Object> response = new HashMap<>();

        if (currentGame == null) {
            response.put("error", "Game not started");
            return response;
        }

        boolean correct = currentGame.guess(letter);

        response.put("correct", correct);
        response.put("maskedWord", currentGame.getMaskedWord());
        response.put("chancesLeft", currentGame.getChancesLeft());
        response.put("gameOver", currentGame.isGameOver());
        response.put("wordGuessed", currentGame.isWordGuessed());

        if (currentGame.isGameOver()) {
            long elapsed = currentGame.getElapsedTime();
            long timeLeft = Math.max(0, 90 - elapsed);
            int score = (currentGame.getChancesLeft() * 50) + ((int) timeLeft * 2);

            response.put("score", score);
            response.put("correctWord", currentGame.getWordToGuess()); // always include original word
            updateUserScores(score);
        }

        if (!currentGame.isWordGuessed()) {
            response.put("correctWord", currentGame.getWordToGuess()); // 👈 Add this
        }

        return response;
    }


    public GameState getCurrentGame() {
        return currentGame;
    }
}
