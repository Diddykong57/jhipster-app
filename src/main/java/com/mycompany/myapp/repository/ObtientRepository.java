package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Obtient;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Obtient entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ObtientRepository extends JpaRepository<Obtient, Long> {}
