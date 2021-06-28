package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Controle;
import com.mycompany.myapp.domain.enumeration.ContType;
import com.mycompany.myapp.repository.ControleRepository;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link ControleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ControleResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_COEF_CONT = 0;
    private static final Integer UPDATED_COEF_CONT = 1;

    private static final ContType DEFAULT_TYPE = ContType.CE;
    private static final ContType UPDATED_TYPE = ContType.CO;

    private static final String ENTITY_API_URL = "/api/controles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ControleRepository controleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restControleMockMvc;

    private Controle controle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Controle createEntity(EntityManager em) {
        Controle controle = new Controle().date(DEFAULT_DATE).coefCont(DEFAULT_COEF_CONT).type(DEFAULT_TYPE);
        return controle;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Controle createUpdatedEntity(EntityManager em) {
        Controle controle = new Controle().date(UPDATED_DATE).coefCont(UPDATED_COEF_CONT).type(UPDATED_TYPE);
        return controle;
    }

    @BeforeEach
    public void initTest() {
        controle = createEntity(em);
    }

    @Test
    @Transactional
    void createControle() throws Exception {
        int databaseSizeBeforeCreate = controleRepository.findAll().size();
        // Create the Controle
        restControleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(controle)))
            .andExpect(status().isCreated());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeCreate + 1);
        Controle testControle = controleList.get(controleList.size() - 1);
        assertThat(testControle.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testControle.getCoefCont()).isEqualTo(DEFAULT_COEF_CONT);
        assertThat(testControle.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void createControleWithExistingId() throws Exception {
        // Create the Controle with an existing ID
        controle.setId(1L);

        int databaseSizeBeforeCreate = controleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restControleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(controle)))
            .andExpect(status().isBadRequest());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllControles() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        // Get all the controleList
        restControleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(controle.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].coefCont").value(hasItem(DEFAULT_COEF_CONT)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }

    @Test
    @Transactional
    void getControle() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        // Get the controle
        restControleMockMvc
            .perform(get(ENTITY_API_URL_ID, controle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(controle.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.coefCont").value(DEFAULT_COEF_CONT))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingControle() throws Exception {
        // Get the controle
        restControleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewControle() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        int databaseSizeBeforeUpdate = controleRepository.findAll().size();

        // Update the controle
        Controle updatedControle = controleRepository.findById(controle.getId()).get();
        // Disconnect from session so that the updates on updatedControle are not directly saved in db
        em.detach(updatedControle);
        updatedControle.date(UPDATED_DATE).coefCont(UPDATED_COEF_CONT).type(UPDATED_TYPE);

        restControleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedControle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedControle))
            )
            .andExpect(status().isOk());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
        Controle testControle = controleList.get(controleList.size() - 1);
        assertThat(testControle.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testControle.getCoefCont()).isEqualTo(UPDATED_COEF_CONT);
        assertThat(testControle.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void putNonExistingControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, controle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(controle))
            )
            .andExpect(status().isBadRequest());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(controle))
            )
            .andExpect(status().isBadRequest());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(controle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateControleWithPatch() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        int databaseSizeBeforeUpdate = controleRepository.findAll().size();

        // Update the controle using partial update
        Controle partialUpdatedControle = new Controle();
        partialUpdatedControle.setId(controle.getId());

        partialUpdatedControle.coefCont(UPDATED_COEF_CONT);

        restControleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedControle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedControle))
            )
            .andExpect(status().isOk());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
        Controle testControle = controleList.get(controleList.size() - 1);
        assertThat(testControle.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testControle.getCoefCont()).isEqualTo(UPDATED_COEF_CONT);
        assertThat(testControle.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    void fullUpdateControleWithPatch() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        int databaseSizeBeforeUpdate = controleRepository.findAll().size();

        // Update the controle using partial update
        Controle partialUpdatedControle = new Controle();
        partialUpdatedControle.setId(controle.getId());

        partialUpdatedControle.date(UPDATED_DATE).coefCont(UPDATED_COEF_CONT).type(UPDATED_TYPE);

        restControleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedControle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedControle))
            )
            .andExpect(status().isOk());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
        Controle testControle = controleList.get(controleList.size() - 1);
        assertThat(testControle.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testControle.getCoefCont()).isEqualTo(UPDATED_COEF_CONT);
        assertThat(testControle.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    void patchNonExistingControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, controle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(controle))
            )
            .andExpect(status().isBadRequest());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(controle))
            )
            .andExpect(status().isBadRequest());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamControle() throws Exception {
        int databaseSizeBeforeUpdate = controleRepository.findAll().size();
        controle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restControleMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(controle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Controle in the database
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteControle() throws Exception {
        // Initialize the database
        controleRepository.saveAndFlush(controle);

        int databaseSizeBeforeDelete = controleRepository.findAll().size();

        // Delete the controle
        restControleMockMvc
            .perform(delete(ENTITY_API_URL_ID, controle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Controle> controleList = controleRepository.findAll();
        assertThat(controleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
