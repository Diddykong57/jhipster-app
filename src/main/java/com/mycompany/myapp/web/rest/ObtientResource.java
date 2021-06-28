package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Obtient;
import com.mycompany.myapp.repository.ObtientRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Obtient}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ObtientResource {

    private final Logger log = LoggerFactory.getLogger(ObtientResource.class);

    private static final String ENTITY_NAME = "obtient";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ObtientRepository obtientRepository;

    public ObtientResource(ObtientRepository obtientRepository) {
        this.obtientRepository = obtientRepository;
    }

    /**
     * {@code POST  /obtients} : Create a new obtient.
     *
     * @param obtient the obtient to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new obtient, or with status {@code 400 (Bad Request)} if the obtient has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/obtients")
    public ResponseEntity<Obtient> createObtient(@Valid @RequestBody Obtient obtient) throws URISyntaxException {
        log.debug("REST request to save Obtient : {}", obtient);
        if (obtient.getId() != null) {
            throw new BadRequestAlertException("A new obtient cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Obtient result = obtientRepository.save(obtient);
        return ResponseEntity
            .created(new URI("/api/obtients/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /obtients/:id} : Updates an existing obtient.
     *
     * @param id the id of the obtient to save.
     * @param obtient the obtient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated obtient,
     * or with status {@code 400 (Bad Request)} if the obtient is not valid,
     * or with status {@code 500 (Internal Server Error)} if the obtient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/obtients/{id}")
    public ResponseEntity<Obtient> updateObtient(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Obtient obtient
    ) throws URISyntaxException {
        log.debug("REST request to update Obtient : {}, {}", id, obtient);
        if (obtient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, obtient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!obtientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Obtient result = obtientRepository.save(obtient);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, obtient.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /obtients/:id} : Partial updates given fields of an existing obtient, field will ignore if it is null
     *
     * @param id the id of the obtient to save.
     * @param obtient the obtient to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated obtient,
     * or with status {@code 400 (Bad Request)} if the obtient is not valid,
     * or with status {@code 404 (Not Found)} if the obtient is not found,
     * or with status {@code 500 (Internal Server Error)} if the obtient couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/obtients/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Obtient> partialUpdateObtient(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Obtient obtient
    ) throws URISyntaxException {
        log.debug("REST request to partial update Obtient partially : {}, {}", id, obtient);
        if (obtient.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, obtient.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!obtientRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Obtient> result = obtientRepository
            .findById(obtient.getId())
            .map(
                existingObtient -> {
                    if (obtient.getNote() != null) {
                        existingObtient.setNote(obtient.getNote());
                    }

                    return existingObtient;
                }
            )
            .map(obtientRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, obtient.getId().toString())
        );
    }

    /**
     * {@code GET  /obtients} : get all the obtients.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of obtients in body.
     */
    @GetMapping("/obtients")
    public List<Obtient> getAllObtients() {
        log.debug("REST request to get all Obtients");
        return obtientRepository.findAll();
    }

    /**
     * {@code GET  /obtients/:id} : get the "id" obtient.
     *
     * @param id the id of the obtient to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the obtient, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/obtients/{id}")
    public ResponseEntity<Obtient> getObtient(@PathVariable Long id) {
        log.debug("REST request to get Obtient : {}", id);
        Optional<Obtient> obtient = obtientRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(obtient);
    }

    /**
     * {@code DELETE  /obtients/:id} : delete the "id" obtient.
     *
     * @param id the id of the obtient to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/obtients/{id}")
    public ResponseEntity<Void> deleteObtient(@PathVariable Long id) {
        log.debug("REST request to delete Obtient : {}", id);
        obtientRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
