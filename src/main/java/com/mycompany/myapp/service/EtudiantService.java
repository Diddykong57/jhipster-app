package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Etudiant;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Etudiant}.
 */
public interface EtudiantService {
    /**
     * Save a etudiant.
     *
     * @param etudiant the entity to save.
     * @return the persisted entity.
     */
    Etudiant save(Etudiant etudiant);

    /**
     * Partially updates a etudiant.
     *
     * @param etudiant the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Etudiant> partialUpdate(Etudiant etudiant);

    /**
     * Get all the etudiants.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Etudiant> findAll(Pageable pageable);

    /**
     * Get the "id" etudiant.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Etudiant> findOne(Long id);

    /**
     * Delete the "id" etudiant.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
