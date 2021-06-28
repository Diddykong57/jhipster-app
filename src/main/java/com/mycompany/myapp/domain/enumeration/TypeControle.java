package com.mycompany.myapp.domain.enumeration;

/**
 * The TypeControle enumeration.
 */
public enum TypeControle {
    CE("comprehensionEcrite"),
    CO("comprehensionOrale"),
    EE("expressionEcrite"),
    EO("expressionOrale");

    private final String value;

    TypeControle(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
