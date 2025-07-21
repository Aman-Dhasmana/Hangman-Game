package com.hangman.hangman_backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WordService {

    @Value("${gemini.api.key}")
    private String API_KEY;

    public String getRandomWordFromGemini() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

        String requestBody = """
{
  "contents": [
    {
      "parts": [
        {
          "text": "Give me one random common English word between 6 to 10 letters, at least two characters should be the same. Only the word. Add variety. Random ID: %s"
        }
      ]
    }
  ]
}
""".formatted(java.util.UUID.randomUUID());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            // Print raw response for debugging
            System.out.println("Gemini response: " + response.getBody());

            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());

            // Navigate: candidates[0] → content → parts[0] → text
            String word = root.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText();

            return word.trim().toLowerCase();
        } catch (Exception e) {
            e.printStackTrace();
            return "catch code";
        }
    }
}
