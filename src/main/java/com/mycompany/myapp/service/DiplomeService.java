package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Diplome;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Diplome}.
 */
public interface DiplomeService {
    /**
     * Save a diplome.
     *
     * @param diplome the entity to save.
     * @return the persisted entity.
     */
    Diplome save(Diplome diplome);

    /**
     * Partially updates a diplome.
     *
     * @param diplome the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Diplome> partialUpdate(Diplome diplome);

    /**
     * Get all the diplomes.
     *
     * @return the list of entities.
     */
    List<Diplome> findAll();

    /**
     * Get the "id" diplome.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Diplome> findOne(Long id);

    /**
     * Delete the "id" diplome.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
