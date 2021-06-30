package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Get;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Get entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GetRepository extends JpaRepository<Get, Long> {}
