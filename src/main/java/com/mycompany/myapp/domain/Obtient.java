package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Obtient.
 */
@Entity
@Table(name = "obtient")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Obtient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @DecimalMin(value = "0")
    @DecimalMax(value = "20")
    @Column(name = "note", nullable = false)
    private Float note;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "obtients", "matiere" }, allowSetters = true)
    private Controle controle;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "obtients", "diplome" }, allowSetters = true)
    private Etudiant etudiant;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Obtient id(Long id) {
        this.id = id;
        return this;
    }

    public Float getNote() {
        return this.note;
    }

    public Obtient note(Float note) {
        this.note = note;
        return this;
    }

    public void setNote(Float note) {
        this.note = note;
    }

    public Controle getControle() {
        return this.controle;
    }

    public Obtient controle(Controle controle) {
        this.setControle(controle);
        return this;
    }

    public void setControle(Controle controle) {
        this.controle = controle;
    }

    public Etudiant getEtudiant() {
        return this.etudiant;
    }

    public Obtient etudiant(Etudiant etudiant) {
        this.setEtudiant(etudiant);
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Obtient)) {
            return false;
        }
        return id != null && id.equals(((Obtient) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Obtient{" +
            "id=" + getId() +
            ", note=" + getNote() +
            "}";
    }
}
