package com.cybersafety.controller;

import com.cybersafety.model.User;
import com.cybersafety.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User savedUser = authService.register(user);

        if (savedUser == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {

        User loggedUser = authService.login(user);

        if (loggedUser == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(loggedUser);
    }
}