package com.cybersafety.controller;

import com.cybersafety.service.QuizService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping("/submit")
    public Map<String, Object> submitQuiz(@RequestBody Map<String, Object> payload) {

        int score = Integer.parseInt(payload.get("score").toString());
        String currentLevel = payload.get("currentLevel").toString();

        String nextLevel = quizService.evaluateQuiz(currentLevel, score);

        Map<String, Object> response = new HashMap<>();
        response.put("score", score);
        response.put("nextLevel", nextLevel);

        if (nextLevel.equalsIgnoreCase("final")) {
            response.put("finalQuiz", true);
        } else {
            response.put("finalQuiz", false);
        }

        return response;
    }
}