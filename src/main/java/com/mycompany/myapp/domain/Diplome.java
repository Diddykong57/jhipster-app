package com.mycompany.myapp.domain;

import java.io.Serializable;
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

    @NotNull
    @Column(name = "id_dipl", nullable = false)
    private Integer idDipl;

    @Column(name = "name_dipl")
    private String nameDipl;

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

    public Integer getIdDipl() {
        return this.idDipl;
    }

    public Diplome idDipl(Integer idDipl) {
        this.idDipl = idDipl;
        return this;
    }

    public void setIdDipl(Integer idDipl) {
        this.idDipl = idDipl;
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
            ", idDipl=" + getIdDipl() +
            ", nameDipl='" + getNameDipl() + "'" +
            "}";
    }
}
