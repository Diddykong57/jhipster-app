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
 * A Diplome.
 */
@Entity
@Table(name = "diplome")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Diplome implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_dipl")
    private String nameDipl;

    @OneToMany(mappedBy = "diplome")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "obtients", "diplome" }, allowSetters = true)
    private Set<Etudiant> etudiants = new HashSet<>();

    @JsonIgnoreProperties(value = { "diplome", "controle" }, allowSetters = true)
    @OneToOne(mappedBy = "diplome")
    private Matiere matiere;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Diplome id(Long id) {
        this.id = id;
        return this;
    }

    public String getNameDipl() {
        return this.nameDipl;
    }

    public Diplome nameDipl(String nameDipl) {
        this.nameDipl = nameDipl;
        return this;
    }

    public void setNameDipl(String nameDipl) {
        this.nameDipl = nameDipl;
    }

    public Set<Etudiant> getEtudiants() {
        return this.etudiants;
    }

    public Diplome etudiants(Set<Etudiant> etudiants) {
        this.setEtudiants(etudiants);
        return this;
    }

    public Diplome addEtudiant(Etudiant etudiant) {
        this.etudiants.add(etudiant);
        etudiant.setDiplome(this);
        return this;
    }

    public Diplome removeEtudiant(Etudiant etudiant) {
        this.etudiants.remove(etudiant);
        etudiant.setDiplome(null);
        return this;
    }

    public void setEtudiants(Set<Etudiant> etudiants) {
        if (this.etudiants != null) {
            this.etudiants.forEach(i -> i.setDiplome(null));
        }
        if (etudiants != null) {
            etudiants.forEach(i -> i.setDiplome(this));
        }
        this.etudiants = etudiants;
    }

    public Matiere getMatiere() {
        return this.matiere;
    }

    public Diplome matiere(Matiere matiere) {
        this.setMatiere(matiere);
        return this;
    }

    public void setMatiere(Matiere matiere) {
        if (this.matiere != null) {
            this.matiere.setDiplome(null);
        }
        if (matiere != null) {
            matiere.setDiplome(this);
        }
        this.matiere = matiere;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Diplome)) {
            return false;
        }
        return id != null && id.equals(((Diplome) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Diplome{" +
            "id=" + getId() +
            ", nameDipl='" + getNameDipl() + "'" +
            "}";
    }
}
