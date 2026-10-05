package com.tssa.registration.enums;

public enum AgeCategory {
    UNDER_10("Under 10"),
    UNDER_12_14("Under 12-14"),
    UNDER_15_16("Under 15-16"),
    UNDER_17("Under 17"),
    UNDER_18("Under 18");

    private final String displayName;

    AgeCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
