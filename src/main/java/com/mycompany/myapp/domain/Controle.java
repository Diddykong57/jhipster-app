package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Controle.
 */
@Entity
@Table(name = "controle")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Controle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "id_cont", nullable = false)
    private Integer idCont;

    @Column(name = "date")
    private LocalDate date;

    @Min(value = 0)
    @Column(name = "coef_cont")
    private Integer coefCont;

    @Column(name = "type")
    private String type;

    @JsonIgnoreProperties(value = { "nameMat" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Matiere idCont;

    @OneToMany(mappedBy = "controle")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "controle", "etudiant" }, allowSetters = true)
    private Set<Obtient> idConts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Controle id(Long id) {
        this.id = id;
        return this;
    }

    public Integer getIdCont() {
        return this.idCont;
    }

    public Controle idCont(Integer idCont) {
        this.idCont = idCont;
        return this;
    }

    public void setIdCont(Integer idCont) {
        this.idCont = idCont;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public Controle date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getCoefCont() {
        return this.coefCont;
    }

    public Controle coefCont(Integer coefCont) {
        this.coefCont = coefCont;
        return this;
    }

    public void setCoefCont(Integer coefCont) {
        this.coefCont = coefCont;
    }

    public String getType() {
        return this.type;
    }

    public Controle type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Matiere getIdCont() {
        return this.idCont;
    }

    public Controle idCont(Matiere matiere) {
        this.setIdCont(matiere);
        return this;
    }

    public void setIdCont(Matiere matiere) {
        this.idCont = matiere;
    }

    public Set<Obtient> getIdConts() {
        return this.idConts;
    }

    public Controle idConts(Set<Obtient> obtients) {
        this.setIdConts(obtients);
        return this;
    }

    public Controle addIdCont(Obtient obtient) {
        this.idConts.add(obtient);
        obtient.setControle(this);
        return this;
    }

    public Controle removeIdCont(Obtient obtient) {
        this.idConts.remove(obtient);
        obtient.setControle(null);
        return this;
    }

    public void setIdConts(Set<Obtient> obtients) {
        if (this.idConts != null) {
            this.idConts.forEach(i -> i.setControle(null));
        }
        if (obtients != null) {
            obtients.forEach(i -> i.setControle(this));
        }
        this.idConts = obtients;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Controle)) {
            return false;
        }
        return id != null && id.equals(((Controle) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Controle{" +
            "id=" + getId() +
            ", idCont=" + getIdCont() +
            ", date='" + getDate() + "'" +
            ", coefCont=" + getCoefCont() +
            ", type='" + getType() + "'" +
            "}";
    }
}
