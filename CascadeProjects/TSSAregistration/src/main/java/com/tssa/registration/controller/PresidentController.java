package com.tssa.registration.controller;

import com.tssa.registration.model.President;
import com.tssa.registration.service.PresidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class PresidentController {

    @Autowired
    private PresidentService presidentService;

    @GetMapping("/presidents")
    public String listPresidents(Model model) {
        model.addAttribute("presidents", presidentService.getAllPresidents());
        return "presidents";
    }

    @GetMapping("/presidents/add")
    public String showAddPresidentForm(Model model) {
        model.addAttribute("president", new President());
        return "president-form";
    }

    @PostMapping("/presidents")
    public String savePresident(@ModelAttribute President president) {
        presidentService.savePresident(president);
        return "redirect:/presidents";
    }
}
