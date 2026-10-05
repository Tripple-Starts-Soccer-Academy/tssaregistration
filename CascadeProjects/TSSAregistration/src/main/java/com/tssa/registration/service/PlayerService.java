package com.tssa.registration.service;

import com.tssa.registration.model.Player;
import com.tssa.registration.model.School;
import com.tssa.registration.model.WorkExperience;
import com.tssa.registration.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private FileStorageService fileStorageService;

    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    public Player getPlayerById(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public Player getPlayerByNin(String nin) {
        return playerRepository.findByNin(nin).orElse(null);
    }

    public List<Player> getPlayersByAgeCategory(com.tssa.registration.enums.AgeCategory ageCategory) {
        return playerRepository.findByAgeCategory(ageCategory);
    }

    @Transactional
    public Player registerPlayer(Player player, MultipartFile transcript, MultipartFile passportPhoto, 
                                  MultipartFile otherDocuments, MultipartFile parentPhoto,
                                  String playerSignature, String parentSignature, String parentConsentAgreement) throws IOException {
        
        // Check if NIN already exists
        if (playerRepository.existsByNin(player.getNin())) {
            throw new IllegalArgumentException("Player with this NIN already exists");
        }

        // Store files as base64
        if (transcript != null && !transcript.isEmpty()) {
            player.setTranscriptDocument(fileStorageService.storeFileAsBase64(transcript));
        }
        if (passportPhoto != null && !passportPhoto.isEmpty()) {
            player.setPassportPhoto(fileStorageService.storeFileAsBase64(passportPhoto));
        }
        if (otherDocuments != null && !otherDocuments.isEmpty()) {
            player.setOtherDocuments(fileStorageService.storeFileAsBase64(otherDocuments));
        }
        if (parentPhoto != null && !parentPhoto.isEmpty()) {
            player.setParentPhoto(fileStorageService.storeFileAsBase64(parentPhoto));
        }

        // Store signatures and consent
        player.setPlayerSignature(playerSignature);
        player.setParentSignature(parentSignature);
        player.setParentConsentAgreement(parentConsentAgreement);

        return playerRepository.save(player);
    }

    @Transactional
    public Player addSchool(Long playerId, School school) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> 
            new IllegalArgumentException("Player not found"));
        school.setPlayer(player);
        player.getSchools().add(school);
        return playerRepository.save(player);
    }

    @Transactional
    public Player addWorkExperience(Long playerId, WorkExperience workExperience) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> 
            new IllegalArgumentException("Player not found"));
        workExperience.setPlayer(player);
        player.getWorkExperiences().add(workExperience);
        return playerRepository.save(player);
    }

    public void deletePlayer(Long id) {
        playerRepository.deleteById(id);
    }
}
