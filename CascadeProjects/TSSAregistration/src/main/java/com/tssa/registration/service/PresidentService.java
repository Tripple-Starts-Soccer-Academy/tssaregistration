package com.tssa.registration.service;

import com.tssa.registration.model.President;
import com.tssa.registration.repository.PresidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PresidentService {

    @Autowired
    private PresidentRepository presidentRepository;

    public List<President> getAllPresidents() {
        return presidentRepository.findAllByOrderByHierarchyLevelAsc();
    }

    public President getPresidentById(Long id) {
        return presidentRepository.findById(id).orElse(null);
    }

    public President savePresident(President president) {
        return presidentRepository.save(president);
    }

    public void deletePresident(Long id) {
        presidentRepository.deleteById(id);
    }
}
