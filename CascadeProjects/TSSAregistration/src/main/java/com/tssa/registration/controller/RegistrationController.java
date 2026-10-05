package com.tssa.registration.controller;

import com.tssa.registration.enums.AgeCategory;
import com.tssa.registration.model.Player;
import com.tssa.registration.model.School;
import com.tssa.registration.model.WorkExperience;
import com.tssa.registration.service.PlayerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;

@Controller
public class RegistrationController {

    @Autowired
    private PlayerService playerService;

    @GetMapping("/")
    public String home() {
        return "redirect:/registration";
    }

    @GetMapping("/test")
    public String test() {
        return "test";
    }

    @GetMapping("/registration")
    public String showRegistrationForm(Model model) {
        model.addAttribute("player", new Player());
        model.addAttribute("ageCategories", AgeCategory.values());
        return "registration";
    }

    @PostMapping("/registration")
    public String submitRegistration(
            @Valid @ModelAttribute("player") Player player,
            BindingResult bindingResult,
            @RequestParam("transcript") MultipartFile transcript,
            @RequestParam("passportPhoto") MultipartFile passportPhoto,
            @RequestParam("otherDocuments") MultipartFile otherDocuments,
            @RequestParam("parentPhoto") MultipartFile parentPhoto,
            @RequestParam("playerSignature") String playerSignature,
            @RequestParam("parentSignature") String parentSignature,
            @RequestParam(value = "parentConsentAgreement", required = false) String parentConsentAgreement,
            Model model,
            RedirectAttributes redirectAttributes) {

        if (bindingResult.hasErrors()) {
            model.addAttribute("ageCategories", AgeCategory.values());
            return "registration";
        }

        if (parentConsentAgreement == null) {
            model.addAttribute("errorMessage", "You must agree to the consent form");
            model.addAttribute("ageCategories", AgeCategory.values());
            return "registration";
        }

        try {
            playerService.registerPlayer(player, transcript, passportPhoto, otherDocuments, parentPhoto,
                                        playerSignature, parentSignature, parentConsentAgreement);
            redirectAttributes.addFlashAttribute("successMessage", 
                "Registration submitted successfully for " + player.getFirstName() + " " + player.getLastName());
            return "redirect:/success";
        } catch (IOException e) {
            model.addAttribute("errorMessage", "Error uploading files: " + e.getMessage());
            model.addAttribute("ageCategories", AgeCategory.values());
            return "registration";
        } catch (IllegalArgumentException e) {
            model.addAttribute("errorMessage", e.getMessage());
            model.addAttribute("ageCategories", AgeCategory.values());
            return "registration";
        }
    }

    @GetMapping("/success")
    public String showSuccessPage() {
        return "success";
    }

    @GetMapping("/players")
    public String listPlayers(Model model) {
        model.addAttribute("players", playerService.getAllPlayers());
        return "players";
    }

    @GetMapping("/players/{id}")
    public String viewPlayer(@PathVariable Long id, Model model) {
        Player player = playerService.getPlayerById(id);
        if (player == null) {
            return "redirect:/players";
        }
        model.addAttribute("player", player);
        return "player-details";
    }
}
