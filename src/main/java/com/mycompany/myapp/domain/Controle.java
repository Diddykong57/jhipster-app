package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TypeControle;
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

    @Column(name = "date")
    private LocalDate date;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "coef_cont")
    private Integer coefCont;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private TypeControle type;

    @JsonIgnoreProperties(value = { "controle" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Matiere matiere;

    @OneToMany(mappedBy = "controle")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "controle", "etudiant" }, allowSetters = true)
    private Set<Obtient> obtients = new HashSet<>();

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

    public TypeControle getType() {
        return this.type;
    }

    public Controle type(TypeControle type) {
        this.type = type;
        return this;
    }

    public void setType(TypeControle type) {
        this.type = type;
    }

    public Matiere getMatiere() {
        return this.matiere;
    }

    public Controle matiere(Matiere matiere) {
        this.setMatiere(matiere);
        return this;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    public Set<Obtient> getObtients() {
        return this.obtients;
    }

    public Controle obtients(Set<Obtient> obtients) {
        this.setObtients(obtients);
        return this;
    }

    public Controle addObtient(Obtient obtient) {
        this.obtients.add(obtient);
        obtient.setControle(this);
        return this;
    }

    public Controle removeObtient(Obtient obtient) {
        this.obtients.remove(obtient);
        obtient.setControle(null);
        return this;
    }

    public void setObtients(Set<Obtient> obtients) {
        if (this.obtients != null) {
            this.obtients.forEach(i -> i.setControle(null));
        }
        if (obtients != null) {
            obtients.forEach(i -> i.setControle(this));
        }
        this.obtients = obtients;
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
            ", date='" + getDate() + "'" +
            ", coefCont=" + getCoefCont() +
            ", type='" + getType() + "'" +
            "}";
    }
}
