package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Controle;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Controle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ControleRepository extends JpaRepository<Controle, Long> {}
