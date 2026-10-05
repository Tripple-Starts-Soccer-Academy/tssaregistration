package com.tssa.registration.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "presidents")
public class President {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "President name is required")
    @Column(nullable = false)
    private String name;

    @Column
    private String title;

    @Column
    private String contactNumber;

    @Column
    private String email;

    @Column
    private Integer hierarchyLevel;

    public President() {}

    public President(String name, String title, String contactNumber, String email, Integer hierarchyLevel) {
        this.name = name;
        this.title = title;
        this.contactNumber = contactNumber;
        this.email = email;
        this.hierarchyLevel = hierarchyLevel;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Integer getHierarchyLevel() { return hierarchyLevel; }
    public void setHierarchyLevel(Integer hierarchyLevel) { this.hierarchyLevel = hierarchyLevel; }
}
