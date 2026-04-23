package com.cybersafety.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private RecommendationService recommendationService;

    public String evaluateQuiz(String currentLevel, int score) {
        return recommendationService.recommendNextLevel(currentLevel, score);
    }
}