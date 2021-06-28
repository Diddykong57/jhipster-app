package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeMatiere;
import java.io.Serializable;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "name_mat")
    private TypeMatiere nameMat;

    @Min(value = 0)
    @Column(name = "coef_mat")
    private Integer coefMat;

    @JsonIgnoreProperties(value = { "obtients" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Controle controle;

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

    public TypeMatiere getNameMat() {
        return this.nameMat;
    }

    public Matiere nameMat(TypeMatiere nameMat) {
        this.nameMat = nameMat;
        return this;
    }

    public void setNameMat(TypeMatiere nameMat) {
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

    public Controle getControle() {
        return this.controle;
    }

    public Matiere controle(Controle controle) {
        this.setControle(controle);
        return this;
    }

    public void setControle(Controle controle) {
        this.controle = controle;
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
