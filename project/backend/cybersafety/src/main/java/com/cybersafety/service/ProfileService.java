package com.cybersafety.service;

import com.cybersafety.model.Profile;
import com.cybersafety.model.User;
import com.cybersafety.repository.ProfileRepository;
import com.cybersafety.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;

    public ProfileService(ProfileRepository profileRepository,
                          UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    /* =========================
       SAVE PROFILE
    ========================= */

    public Profile saveProfile(Long userId, Profile profileData){

        Optional<User> userOptional = userRepository.findById(userId);

        if(userOptional.isEmpty()){
            return null;
        }

        User user = userOptional.get();

        Profile profile = new Profile();

        profile.setFullName(profileData.getFullName());
        profile.setAge(profileData.getAge());
        profile.setGender(profileData.getGender());
        profile.setAvatar(profileData.getAvatar());

        profile.setCompletedModules(0);
        profile.setCurrentLevel(1);
        profile.setCertificateGenerated(0);
        profile.setTotalScore(0);
        profile.setPreferredLanguage("en");

        profile.setUser(user);

        return profileRepository.save(profile);
    }

    /* =========================
       GET PROFILE
    ========================= */

    public Profile getProfile(Long userId){
        return profileRepository.findByUserId(userId);
    }

    /* =========================
       UPDATE MODULE PROGRESS
    ========================= */

    public void updateProgress(Long userId, String module, int score, String language){

        Profile profile = profileRepository.findByUserId(userId);

        if(profile == null) return;

        int completed = profile.getCompletedModules();

        /* prevent progress exceeding total modules */

        if(completed < 4){
            completed++;
        }

        profile.setCompletedModules(completed);

        /* update level */

        profile.setCurrentLevel(completed + 1);

        /* save language */

        profile.setPreferredLanguage(language);

        /* save best score */

        profile.setTotalScore(score);

        /* certificate generated */

        profile.setCertificateGenerated(1);

        profileRepository.save(profile);
    }
}