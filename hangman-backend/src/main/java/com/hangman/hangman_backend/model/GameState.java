package com.hangman.hangman_backend.model;

import lombok.Data;
import lombok.Getter;

import java.util.HashSet;
import java.util.Set;

@Data
public class GameState {
    @Getter
    private String wordToGuess;
    private StringBuilder maskedWord;
    private int chancesLeft;
    private Set<Character> guessedLetters;
    private long startTime;


    public GameState(String wordToGuess) {
        this.wordToGuess = wordToGuess.toLowerCase();
        this.maskedWord = new StringBuilder("_".repeat(wordToGuess.length()));
        this.chancesLeft = 7;
        this.guessedLetters = new HashSet<>();
        this.startTime = System.currentTimeMillis();
    }

    public long getElapsedTime() {
        return (System.currentTimeMillis() - startTime) / 1000; // in seconds
    }

    public boolean guess(char letter) {
        letter = Character.toLowerCase(letter);
        if (guessedLetters.contains(letter)) return false;

        guessedLetters.add(letter);
        boolean found = false;

        for (int i = 0; i < wordToGuess.length(); i++) {
            if (wordToGuess.charAt(i) == letter) {
                maskedWord.setCharAt(i, letter);
                found = true;
            }
        }

        if (!found) chancesLeft--;
        return found;
    }

    public boolean isGameOver() {
        return chancesLeft == 0 || maskedWord.toString().equals(wordToGuess);
    }


    public String getMaskedWord() { return maskedWord.toString(); }
    public int getChancesLeft() { return chancesLeft; }
    public boolean isWordGuessed() { return maskedWord.toString().equals(wordToGuess); }
    public Set<Character> getGuessedLetters() { return guessedLetters; }

}
