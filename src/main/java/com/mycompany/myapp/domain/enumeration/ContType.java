package com.mycompany.myapp.domain.enumeration;

/**
 * The ContType enumeration.
 */
public enum ContType {
    CE("comprehensionEcrite"),
    CO("comprehensionOrale"),
    EE("expressionEcrite"),
    EO("expressionOrale");

    private final String value;

    ContType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
