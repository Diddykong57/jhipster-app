package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Diplome;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Diplome entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiplomeRepository extends JpaRepository<Diplome, Long> {}
