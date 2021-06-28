package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
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

    @JsonIgnoreProperties(value = { "obtients" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Etudiant etudiant;

    @JsonIgnoreProperties(value = { "controle" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
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

    public Etudiant getEtudiant() {
        return this.etudiant;
    }

    public Diplome etudiant(Etudiant etudiant) {
        this.setEtudiant(etudiant);
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Matiere getMatiere() {
        return this.matiere;
    }

    public Diplome matiere(Matiere matiere) {
        this.setMatiere(matiere);
        return this;
    }

    public void setMatiere(Matiere matiere) {
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
