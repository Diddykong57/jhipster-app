package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Etudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_etud", nullable = false)
    private Integer idEtud;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @OneToOne
    @JoinColumn(unique = true)
    private Diplome firstName;

    @OneToMany(mappedBy = "etudiant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "controle", "etudiant" }, allowSetters = true)
    private Set<Obtient> idEtuds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Etudiant id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getIdEtud() {
        return this.idEtud;
    }

    public Etudiant idEtud(Integer idEtud) {
        this.idEtud = idEtud;
        return this;
    }

    public void setIdEtud(Integer idEtud) {
        this.idEtud = idEtud;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Etudiant firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Etudiant lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Diplome getFirstName() {
        return this.firstName;
    }

    public Etudiant firstName(Diplome diplome) {
        this.setFirstName(diplome);
        return this;
    }

    public void setFirstName(Diplome diplome) {
        this.firstName = diplome;
    }

    public Set<Obtient> getIdEtuds() {
        return this.idEtuds;
    }

    public Etudiant idEtuds(Set<Obtient> obtients) {
        this.setIdEtuds(obtients);
        return this;
    }

    public Etudiant addIdEtud(Obtient obtient) {
        this.idEtuds.add(obtient);
        obtient.setEtudiant(this);
        return this;
    }

    public Etudiant removeIdEtud(Obtient obtient) {
        this.idEtuds.remove(obtient);
        obtient.setEtudiant(null);
        return this;
    }

    public void setIdEtuds(Set<Obtient> obtients) {
        if (this.idEtuds != null) {
            this.idEtuds.forEach(i -> i.setEtudiant(null));
        }
        if (obtients != null) {
            obtients.forEach(i -> i.setEtudiant(this));
        }
        this.idEtuds = obtients;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Etudiant)) {
            return false;
        }
        return id != null && id.equals(((Etudiant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", idEtud=" + getIdEtud() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            "}";
    }
}
