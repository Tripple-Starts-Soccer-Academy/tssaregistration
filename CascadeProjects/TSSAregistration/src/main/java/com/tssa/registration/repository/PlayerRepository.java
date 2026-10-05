package com.tssa.registration.repository;

import com.tssa.registration.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    Optional<Player> findByNin(String nin);
    List<Player> findByAgeCategory(com.tssa.registration.enums.AgeCategory ageCategory);
    boolean existsByNin(String nin);
}
