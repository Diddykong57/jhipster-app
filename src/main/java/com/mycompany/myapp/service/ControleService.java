package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Controle;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Controle}.
 */
public interface ControleService {
    /**
     * Save a controle.
     *
     * @param controle the entity to save.
     * @return the persisted entity.
     */
    Controle save(Controle controle);

    /**
     * Partially updates a controle.
     *
     * @param controle the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Controle> partialUpdate(Controle controle);

    /**
     * Get all the controles.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Controle> findAll(Pageable pageable);

    /**
     * Get the "id" controle.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Controle> findOne(Long id);

    /**
     * Delete the "id" controle.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
