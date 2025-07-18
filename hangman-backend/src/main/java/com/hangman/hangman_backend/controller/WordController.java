package com.hangman.hangman_backend.controller;


import com.hangman.hangman_backend.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://localhost:5137")
public class WordController {

    @Autowired
    private WordService wordService;

    @GetMapping("/word")
    public Map<String, String> getRandomWord() {
        String word = wordService.getRandomWordFromGemini();
        return Map.of("word", word);
    }
}
