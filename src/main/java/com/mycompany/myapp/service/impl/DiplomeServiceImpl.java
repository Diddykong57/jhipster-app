package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Diplome;
import com.mycompany.myapp.repository.DiplomeRepository;
import com.mycompany.myapp.service.DiplomeService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Diplome}.
 */
@Service
@Transactional
public class DiplomeServiceImpl implements DiplomeService {

    private final Logger log = LoggerFactory.getLogger(DiplomeServiceImpl.class);

    private final DiplomeRepository diplomeRepository;

    public DiplomeServiceImpl(DiplomeRepository diplomeRepository) {
        this.diplomeRepository = diplomeRepository;
    }

    @Override
    public Diplome save(Diplome diplome) {
        log.debug("Request to save Diplome : {}", diplome);
        return diplomeRepository.save(diplome);
    }

    @Override
    public Optional<Diplome> partialUpdate(Diplome diplome) {
        log.debug("Request to partially update Diplome : {}", diplome);

        return diplomeRepository
            .findById(diplome.getId())
            .map(
                existingDiplome -> {
                    if (diplome.getNameDipl() != null) {
                        existingDiplome.setNameDipl(diplome.getNameDipl());
                    }

                    return existingDiplome;
                }
            )
            .map(diplomeRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Diplome> findAll() {
        log.debug("Request to get all Diplomes");
        return diplomeRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Diplome> findOne(Long id) {
        log.debug("Request to get Diplome : {}", id);
        return diplomeRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Diplome : {}", id);
        diplomeRepository.deleteById(id);
    }
}
