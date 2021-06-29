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
 * A Matiere.
 */
@Entity
@Table(name = "matiere")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Matiere implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_mat")
    private String nameMat;

    @Min(value = 1)
    @Max(value = 5)
    @Column(name = "coef_mat")
    private Integer coefMat;

    @OneToMany(mappedBy = "matiere")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "obtients", "matiere" }, allowSetters = true)
    private Set<Controle> controles = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "etudiants", "matieres" }, allowSetters = true)
    private Diplome diplome;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Matiere id(Long id) {
        this.id = id;
        return this;
    }

    public String getNameMat() {
        return this.nameMat;
    }

    public Matiere nameMat(String nameMat) {
        this.nameMat = nameMat;
        return this;
    }

    public void setNameMat(String nameMat) {
        this.nameMat = nameMat;
    }

    public Integer getCoefMat() {
        return this.coefMat;
    }

    public Matiere coefMat(Integer coefMat) {
        this.coefMat = coefMat;
        return this;
    }

    public void setCoefMat(Integer coefMat) {
        this.coefMat = coefMat;
    }

    public Set<Controle> getControles() {
        return this.controles;
    }

    public Matiere controles(Set<Controle> controles) {
        this.setControles(controles);
        return this;
    }

    public Matiere addControle(Controle controle) {
        this.controles.add(controle);
        controle.setMatiere(this);
        return this;
    }

    public Matiere removeControle(Controle controle) {
        this.controles.remove(controle);
        controle.setMatiere(null);
        return this;
    }

    public void setControles(Set<Controle> controles) {
        if (this.controles != null) {
            this.controles.forEach(i -> i.setMatiere(null));
        }
        if (controles != null) {
            controles.forEach(i -> i.setMatiere(this));
        }
        this.controles = controles;
    }

    public Diplome getDiplome() {
        return this.diplome;
    }

    public Matiere diplome(Diplome diplome) {
        this.setDiplome(diplome);
        return this;
    }

    public void setDiplome(Diplome diplome) {
        this.diplome = diplome;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Matiere)) {
            return false;
        }
        return id != null && id.equals(((Matiere) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Matiere{" +
            "id=" + getId() +
            ", nameMat='" + getNameMat() + "'" +
            ", coefMat=" + getCoefMat() +
            "}";
    }
}
