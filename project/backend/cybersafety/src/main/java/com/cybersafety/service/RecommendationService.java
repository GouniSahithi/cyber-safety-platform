package com.cybersafety.service;

import org.springframework.stereotype.Service;

@Service
public class RecommendationService {

    public String recommendNextLevel(String currentLevel, int score) {

        if (currentLevel.equalsIgnoreCase("easy")) {

            if (score >= 75) {
                return "medium";
            } else {
                return "easy";
            }
        }

        if (currentLevel.equalsIgnoreCase("medium")) {

            if (score >= 75) {
                return "difficult";
            } else {
                return "medium";
            }
        }

        if (currentLevel.equalsIgnoreCase("difficult")) {

            if (score >= 75) {
                return "final";
            } else {
                return "difficult";
            }
        }

        return "easy";
    }
}