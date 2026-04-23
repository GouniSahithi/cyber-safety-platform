package com.cybersafety.controller;

import com.cybersafety.model.Profile;
import com.cybersafety.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins="*")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService){
        this.profileService = profileService;
    }

    @PostMapping("/save/{userId}")
    public Profile saveProfile(@PathVariable Long userId,
                               @RequestBody Profile profile){

        return profileService.saveProfile(userId,profile);
    }

    @GetMapping("/{userId}")
    public Profile getProfile(@PathVariable Long userId){

        return profileService.getProfile(userId);
    }

    /* UPDATE MODULE PROGRESS */

    @PostMapping("/updateProgress/{userId}")
    public void updateProgress(@PathVariable Long userId,
                               @RequestParam String module,
                               @RequestParam int score,
                               @RequestParam String language){

        profileService.updateProgress(userId,module,score,language);
    }
}