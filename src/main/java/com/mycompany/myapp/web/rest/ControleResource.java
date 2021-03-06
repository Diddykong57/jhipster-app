package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Controle;
import com.mycompany.myapp.repository.ControleRepository;
import com.mycompany.myapp.service.ControleService;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Controle}.
 */
@RestController
@RequestMapping("/api")
public class ControleResource {

    private final Logger log = LoggerFactory.getLogger(ControleResource.class);

    private static final String ENTITY_NAME = "controle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ControleService controleService;

    private final ControleRepository controleRepository;

    public ControleResource(ControleService controleService, ControleRepository controleRepository) {
        this.controleService = controleService;
        this.controleRepository = controleRepository;
    }

    /**
     * {@code POST  /controles} : Create a new controle.
     *
     * @param controle the controle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new controle, or with status {@code 400 (Bad Request)} if the controle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/controles")
    public ResponseEntity<Controle> createControle(@Valid @RequestBody Controle controle) throws URISyntaxException {
        log.debug("REST request to save Controle : {}", controle);
        if (controle.getId() != null) {
            throw new BadRequestAlertException("A new controle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Controle result = controleService.save(controle);
        return ResponseEntity
            .created(new URI("/api/controles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /controles/:id} : Updates an existing controle.
     *
     * @param id the id of the controle to save.
     * @param controle the controle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated controle,
     * or with status {@code 400 (Bad Request)} if the controle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the controle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/controles/{id}")
    public ResponseEntity<Controle> updateControle(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Controle controle
    ) throws URISyntaxException {
        log.debug("REST request to update Controle : {}, {}", id, controle);
        if (controle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, controle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!controleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Controle result = controleService.save(controle);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, controle.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /controles/:id} : Partial updates given fields of an existing controle, field will ignore if it is null
     *
     * @param id the id of the controle to save.
     * @param controle the controle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated controle,
     * or with status {@code 400 (Bad Request)} if the controle is not valid,
     * or with status {@code 404 (Not Found)} if the controle is not found,
     * or with status {@code 500 (Internal Server Error)} if the controle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/controles/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Controle> partialUpdateControle(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Controle controle
    ) throws URISyntaxException {
        log.debug("REST request to partial update Controle partially : {}, {}", id, controle);
        if (controle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, controle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!controleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Controle> result = controleService.partialUpdate(controle);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, controle.getId().toString())
        );
    }

    /**
     * {@code GET  /controles} : get all the controles.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of controles in body.
     */
    @GetMapping("/controles")
    public ResponseEntity<List<Controle>> getAllControles(Pageable pageable) {
        log.debug("REST request to get a page of Controles");
        Page<Controle> page = controleService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /controles/:id} : get the "id" controle.
     *
     * @param id the id of the controle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the controle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/controles/{id}")
    public ResponseEntity<Controle> getControle(@PathVariable Long id) {
        log.debug("REST request to get Controle : {}", id);
        Optional<Controle> controle = controleService.findOne(id);
        return ResponseUtil.wrapOrNotFound(controle);
    }

    /**
     * {@code DELETE  /controles/:id} : delete the "id" controle.
     *
     * @param id the id of the controle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/controles/{id}")
    public ResponseEntity<Void> deleteControle(@PathVariable Long id) {
        log.debug("REST request to delete Controle : {}", id);
        controleService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
