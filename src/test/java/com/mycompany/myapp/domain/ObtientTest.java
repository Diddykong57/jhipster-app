package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ObtientTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Obtient.class);
        Obtient obtient1 = new Obtient();
        obtient1.setId(1L);
        Obtient obtient2 = new Obtient();
        obtient2.setId(obtient1.getId());
        assertThat(obtient1).isEqualTo(obtient2);
        obtient2.setId(2L);
        assertThat(obtient1).isNotEqualTo(obtient2);
        obtient1.setId(null);
        assertThat(obtient1).isNotEqualTo(obtient2);
    }
}
