package com.hangman.hangman_backend.dto;

import com.hangman.hangman_backend.model.GameScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameScoreRepository extends JpaRepository<GameScore,Long> {
    List<GameScore> findTop3ByUserIdOrderByScoreDesc(Long userId);
}
