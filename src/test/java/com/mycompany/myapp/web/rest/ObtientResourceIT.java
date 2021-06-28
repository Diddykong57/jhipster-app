package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Controle;
import com.mycompany.myapp.domain.Etudiant;
import com.mycompany.myapp.domain.Obtient;
import com.mycompany.myapp.repository.ObtientRepository;
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
 * Integration tests for the {@link ObtientResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ObtientResourceIT {

    private static final Float DEFAULT_NOTE = 0F;
    private static final Float UPDATED_NOTE = 1F;

    private static final String ENTITY_API_URL = "/api/obtients";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObtientRepository obtientRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restObtientMockMvc;

    private Obtient obtient;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Obtient createEntity(EntityManager em) {
        Obtient obtient = new Obtient().note(DEFAULT_NOTE);
        // Add required entity
        Controle controle;
        if (TestUtil.findAll(em, Controle.class).isEmpty()) {
            controle = ControleResourceIT.createEntity(em);
            em.persist(controle);
            em.flush();
        } else {
            controle = TestUtil.findAll(em, Controle.class).get(0);
        }
        obtient.setControle(controle);
        // Add required entity
        Etudiant etudiant;
        if (TestUtil.findAll(em, Etudiant.class).isEmpty()) {
            etudiant = EtudiantResourceIT.createEntity(em);
            em.persist(etudiant);
            em.flush();
        } else {
            etudiant = TestUtil.findAll(em, Etudiant.class).get(0);
        }
        obtient.setEtudiant(etudiant);
        return obtient;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Obtient createUpdatedEntity(EntityManager em) {
        Obtient obtient = new Obtient().note(UPDATED_NOTE);
        // Add required entity
        Controle controle;
        if (TestUtil.findAll(em, Controle.class).isEmpty()) {
            controle = ControleResourceIT.createUpdatedEntity(em);
            em.persist(controle);
            em.flush();
        } else {
            controle = TestUtil.findAll(em, Controle.class).get(0);
        }
        obtient.setControle(controle);
        // Add required entity
        Etudiant etudiant;
        if (TestUtil.findAll(em, Etudiant.class).isEmpty()) {
            etudiant = EtudiantResourceIT.createUpdatedEntity(em);
            em.persist(etudiant);
            em.flush();
        } else {
            etudiant = TestUtil.findAll(em, Etudiant.class).get(0);
        }
        obtient.setEtudiant(etudiant);
        return obtient;
    }

    @BeforeEach
    public void initTest() {
        obtient = createEntity(em);
    }

    @Test
    @Transactional
    void createObtient() throws Exception {
        int databaseSizeBeforeCreate = obtientRepository.findAll().size();
        // Create the Obtient
        restObtientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(obtient)))
            .andExpect(status().isCreated());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeCreate + 1);
        Obtient testObtient = obtientList.get(obtientList.size() - 1);
        assertThat(testObtient.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    void createObtientWithExistingId() throws Exception {
        // Create the Obtient with an existing ID
        obtient.setId(1L);

        int databaseSizeBeforeCreate = obtientRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restObtientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(obtient)))
            .andExpect(status().isBadRequest());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNoteIsRequired() throws Exception {
        int databaseSizeBeforeTest = obtientRepository.findAll().size();
        // set the field null
        obtient.setNote(null);

        // Create the Obtient, which fails.

        restObtientMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(obtient)))
            .andExpect(status().isBadRequest());

        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllObtients() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        // Get all the obtientList
        restObtientMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(obtient.getId().intValue())))
            .andExpect(jsonPath("$.[*].note").value(hasItem(DEFAULT_NOTE.doubleValue())));
    }

    @Test
    @Transactional
    void getObtient() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        // Get the obtient
        restObtientMockMvc
            .perform(get(ENTITY_API_URL_ID, obtient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(obtient.getId().intValue()))
            .andExpect(jsonPath("$.note").value(DEFAULT_NOTE.doubleValue()));
    }

    @Test
    @Transactional
    void getNonExistingObtient() throws Exception {
        // Get the obtient
        restObtientMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewObtient() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();

        // Update the obtient
        Obtient updatedObtient = obtientRepository.findById(obtient.getId()).get();
        // Disconnect from session so that the updates on updatedObtient are not directly saved in db
        em.detach(updatedObtient);
        updatedObtient.note(UPDATED_NOTE);

        restObtientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedObtient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedObtient))
            )
            .andExpect(status().isOk());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
        Obtient testObtient = obtientList.get(obtientList.size() - 1);
        assertThat(testObtient.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void putNonExistingObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, obtient.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(obtient))
            )
            .andExpect(status().isBadRequest());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(obtient))
            )
            .andExpect(status().isBadRequest());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(obtient)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateObtientWithPatch() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();

        // Update the obtient using partial update
        Obtient partialUpdatedObtient = new Obtient();
        partialUpdatedObtient.setId(obtient.getId());

        restObtientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedObtient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedObtient))
            )
            .andExpect(status().isOk());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
        Obtient testObtient = obtientList.get(obtientList.size() - 1);
        assertThat(testObtient.getNote()).isEqualTo(DEFAULT_NOTE);
    }

    @Test
    @Transactional
    void fullUpdateObtientWithPatch() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();

        // Update the obtient using partial update
        Obtient partialUpdatedObtient = new Obtient();
        partialUpdatedObtient.setId(obtient.getId());

        partialUpdatedObtient.note(UPDATED_NOTE);

        restObtientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedObtient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedObtient))
            )
            .andExpect(status().isOk());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
        Obtient testObtient = obtientList.get(obtientList.size() - 1);
        assertThat(testObtient.getNote()).isEqualTo(UPDATED_NOTE);
    }

    @Test
    @Transactional
    void patchNonExistingObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, obtient.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(obtient))
            )
            .andExpect(status().isBadRequest());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(obtient))
            )
            .andExpect(status().isBadRequest());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamObtient() throws Exception {
        int databaseSizeBeforeUpdate = obtientRepository.findAll().size();
        obtient.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restObtientMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(obtient)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Obtient in the database
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteObtient() throws Exception {
        // Initialize the database
        obtientRepository.saveAndFlush(obtient);

        int databaseSizeBeforeDelete = obtientRepository.findAll().size();

        // Delete the obtient
        restObtientMockMvc
            .perform(delete(ENTITY_API_URL_ID, obtient.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Obtient> obtientList = obtientRepository.findAll();
        assertThat(obtientList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
