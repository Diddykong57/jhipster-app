package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ControleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Controle.class);
        Controle controle1 = new Controle();
        controle1.setId(1L);
        Controle controle2 = new Controle();
        controle2.setId(controle1.getId());
        assertThat(controle1).isEqualTo(controle2);
        controle2.setId(2L);
        assertThat(controle1).isNotEqualTo(controle2);
        controle1.setId(null);
        assertThat(controle1).isNotEqualTo(controle2);
    }
}
