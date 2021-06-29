package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Diplome;
import com.mycompany.myapp.repository.DiplomeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Diplome}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DiplomeResource {

    private final Logger log = LoggerFactory.getLogger(DiplomeResource.class);

    private static final String ENTITY_NAME = "diplome";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiplomeRepository diplomeRepository;

    public DiplomeResource(DiplomeRepository diplomeRepository) {
        this.diplomeRepository = diplomeRepository;
    }

    /**
     * {@code POST  /diplomes} : Create a new diplome.
     *
     * @param diplome the diplome to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new diplome, or with status {@code 400 (Bad Request)} if the diplome has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/diplomes")
    public ResponseEntity<Diplome> createDiplome(@Valid @RequestBody Diplome diplome) throws URISyntaxException {
        log.debug("REST request to save Diplome : {}", diplome);
        if (diplome.getId() != null) {
            throw new BadRequestAlertException("A new diplome cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diplome result = diplomeRepository.save(diplome);
        return ResponseEntity
            .created(new URI("/api/diplomes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /diplomes/:id} : Updates an existing diplome.
     *
     * @param id the id of the diplome to save.
     * @param diplome the diplome to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diplome,
     * or with status {@code 400 (Bad Request)} if the diplome is not valid,
     * or with status {@code 500 (Internal Server Error)} if the diplome couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/diplomes/{id}")
    public ResponseEntity<Diplome> updateDiplome(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Diplome diplome
    ) throws URISyntaxException {
        log.debug("REST request to update Diplome : {}, {}", id, diplome);
        if (diplome.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, diplome.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diplomeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Diplome result = diplomeRepository.save(diplome);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diplome.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /diplomes/:id} : Partial updates given fields of an existing diplome, field will ignore if it is null
     *
     * @param id the id of the diplome to save.
     * @param diplome the diplome to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated diplome,
     * or with status {@code 400 (Bad Request)} if the diplome is not valid,
     * or with status {@code 404 (Not Found)} if the diplome is not found,
     * or with status {@code 500 (Internal Server Error)} if the diplome couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/diplomes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Diplome> partialUpdateDiplome(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Diplome diplome
    ) throws URISyntaxException {
        log.debug("REST request to partial update Diplome partially : {}, {}", id, diplome);
        if (diplome.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, diplome.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!diplomeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Diplome> result = diplomeRepository
            .findById(diplome.getId())
            .map(
                existingDiplome -> {
                    if (diplome.getNameDipl() != null) {
                        existingDiplome.setNameDipl(diplome.getNameDipl());
                    }

                    return existingDiplome;
                }
            )
            .map(diplomeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, diplome.getId().toString())
        );
    }

    /**
     * {@code GET  /diplomes} : get all the diplomes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of diplomes in body.
     */
    @GetMapping("/diplomes")
    public List<Diplome> getAllDiplomes(@RequestParam(required = false) String filter) {
        if ("etudiant-is-null".equals(filter)) {
            log.debug("REST request to get all Diplomes where etudiant is null");
            return StreamSupport
                .stream(diplomeRepository.findAll().spliterator(), false)
                .filter(diplome -> diplome.getEtudiant() == null)
                .collect(Collectors.toList());
        }

        if ("matiere-is-null".equals(filter)) {
            log.debug("REST request to get all Diplomes where matiere is null");
            return StreamSupport
                .stream(diplomeRepository.findAll().spliterator(), false)
                .filter(diplome -> diplome.getMatiere() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all Diplomes");
        return diplomeRepository.findAll();
    }

    /**
     * {@code GET  /diplomes/:id} : get the "id" diplome.
     *
     * @param id the id of the diplome to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the diplome, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/diplomes/{id}")
    public ResponseEntity<Diplome> getDiplome(@PathVariable Long id) {
        log.debug("REST request to get Diplome : {}", id);
        Optional<Diplome> diplome = diplomeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diplome);
    }

    /**
     * {@code DELETE  /diplomes/:id} : delete the "id" diplome.
     *
     * @param id the id of the diplome to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/diplomes/{id}")
    public ResponseEntity<Void> deleteDiplome(@PathVariable Long id) {
        log.debug("REST request to delete Diplome : {}", id);
        diplomeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
