package com.mycompany.myapp.domain.enumeration;

/**
 * The TypeMatiere enumeration.
 */
public enum TypeMatiere {
    MATHS("Mathematiques"),
    FR("Francais"),
    EN("Anglais"),
    PHY("Physique"),
    CHI("Chimie"),
    PHILO("Philosophie"),
    SPORT("Sport"),
    SVT("Science");

    private final String value;

    TypeMatiere(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
