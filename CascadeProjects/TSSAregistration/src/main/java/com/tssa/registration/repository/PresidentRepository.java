package com.tssa.registration.repository;

import com.tssa.registration.model.President;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PresidentRepository extends JpaRepository<President, Long> {
    List<President> findByHierarchyLevelOrderByHierarchyLevelAsc(Integer hierarchyLevel);
    List<President> findAllByOrderByHierarchyLevelAsc();
}
