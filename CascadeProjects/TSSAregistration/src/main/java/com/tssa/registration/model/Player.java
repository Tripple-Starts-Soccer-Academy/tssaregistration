package com.tssa.registration.model;

import com.tssa.registration.enums.AgeCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Column(nullable = false)
    private String lastName;

    @NotNull(message = "Date of birth is required")
    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @NotBlank(message = "NIN is required")
    @Column(nullable = false, unique = true)
    private String nin;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Age category is required")
    @Column(nullable = false)
    private AgeCategory ageCategory;

    @NotBlank(message = "Address is required")
    @Column(nullable = false)
    private String address;

    @NotBlank(message = "Position is required")
    @Column(nullable = false)
    private String position;

    @Column
    private Integer lockerNumber;

    @Column
    private String shoeSize;

    @Column
    private String height;

    @Column
    private String weight;

    @Column(length = 1000)
    private String hobbies;

    @Column(length = 10000)
    @Lob
    private String transcriptDocument;

    @Column(length = 10000)
    @Lob
    private String passportPhoto;

    @Column(length = 10000)
    @Lob
    private String otherDocuments;

    @Column(length = 1000)
    private String playerSignature;

    @Column(length = 1000)
    private String parentSignature;

    @Column
    private String parentFirstName;

    @Column
    private String parentLastName;

    @Column
    private LocalDate parentDateOfBirth;

    @Column(length = 10000)
    @Lob
    private String parentPhoto;

    @Column(length = 1000)
    private String parentConsentAgreement;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private List<School> schools;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    private List<WorkExperience> workExperiences;

    public Player() {}

    public Player(String firstName, String lastName, LocalDate dateOfBirth, String nin, 
                  AgeCategory ageCategory, String address, String position) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.nin = nin;
        this.ageCategory = ageCategory;
        this.address = address;
        this.position = position;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getNin() { return nin; }
    public void setNin(String nin) { this.nin = nin; }

    public AgeCategory getAgeCategory() { return ageCategory; }
    public void setAgeCategory(AgeCategory ageCategory) { this.ageCategory = ageCategory; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPosition() { return position; }
    public void setPosition(String position) { this.position = position; }

    public Integer getLockerNumber() { return lockerNumber; }
    public void setLockerNumber(Integer lockerNumber) { this.lockerNumber = lockerNumber; }

    public String getShoeSize() { return shoeSize; }
    public void setShoeSize(String shoeSize) { this.shoeSize = shoeSize; }

    public String getHeight() { return height; }
    public void setHeight(String height) { this.height = height; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getHobbies() { return hobbies; }
    public void setHobbies(String hobbies) { this.hobbies = hobbies; }

    public String getTranscriptDocument() { return transcriptDocument; }
    public void setTranscriptDocument(String transcriptDocument) { this.transcriptDocument = transcriptDocument; }

    public String getPassportPhoto() { return passportPhoto; }
    public void setPassportPhoto(String passportPhoto) { this.passportPhoto = passportPhoto; }

    public String getOtherDocuments() { return otherDocuments; }
    public void setOtherDocuments(String otherDocuments) { this.otherDocuments = otherDocuments; }

    public String getPlayerSignature() { return playerSignature; }
    public void setPlayerSignature(String playerSignature) { this.playerSignature = playerSignature; }

    public String getParentSignature() { return parentSignature; }
    public void setParentSignature(String parentSignature) { this.parentSignature = parentSignature; }

    public String getParentFirstName() { return parentFirstName; }
    public void setParentFirstName(String parentFirstName) { this.parentFirstName = parentFirstName; }

    public String getParentLastName() { return parentLastName; }
    public void setParentLastName(String parentLastName) { this.parentLastName = parentLastName; }

    public LocalDate getParentDateOfBirth() { return parentDateOfBirth; }
    public void setParentDateOfBirth(LocalDate parentDateOfBirth) { this.parentDateOfBirth = parentDateOfBirth; }

    public String getParentPhoto() { return parentPhoto; }
    public void setParentPhoto(String parentPhoto) { this.parentPhoto = parentPhoto; }

    public String getParentConsentAgreement() { return parentConsentAgreement; }
    public void setParentConsentAgreement(String parentConsentAgreement) { this.parentConsentAgreement = parentConsentAgreement; }

    public List<School> getSchools() { return schools; }
    public void setSchools(List<School> schools) { this.schools = schools; }

    public List<WorkExperience> getWorkExperiences() { return workExperiences; }
    public void setWorkExperiences(List<WorkExperience> workExperiences) { this.workExperiences = workExperiences; }
}
