package com.tssa.registration.controller;

import com.tssa.registration.model.Coach;
import com.tssa.registration.service.CoachService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class CoachController {

    @Autowired
    private CoachService coachService;

    @GetMapping("/coaches")
    public String listCoaches(Model model) {
        model.addAttribute("coaches", coachService.getAllCoaches());
        return "coaches";
    }

    @GetMapping("/coaches/add")
    public String showAddCoachForm(Model model) {
        model.addAttribute("coach", new Coach());
        return "coach-form";
    }

    @PostMapping("/coaches")
    public String saveCoach(@ModelAttribute Coach coach) {
        coachService.saveCoach(coach);
        return "redirect:/coaches";
    }
}
