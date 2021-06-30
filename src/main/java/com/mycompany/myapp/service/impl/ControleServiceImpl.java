package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Controle;
import com.mycompany.myapp.repository.ControleRepository;
import com.mycompany.myapp.service.ControleService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Controle}.
 */
@Service
@Transactional
public class ControleServiceImpl implements ControleService {

    private final Logger log = LoggerFactory.getLogger(ControleServiceImpl.class);

    private final ControleRepository controleRepository;

    public ControleServiceImpl(ControleRepository controleRepository) {
        this.controleRepository = controleRepository;
    }

    @Override
    public Controle save(Controle controle) {
        log.debug("Request to save Controle : {}", controle);
        return controleRepository.save(controle);
    }

    @Override
    public Optional<Controle> partialUpdate(Controle controle) {
        log.debug("Request to partially update Controle : {}", controle);

        return controleRepository
            .findById(controle.getId())
            .map(
                existingControle -> {
                    if (controle.getDate() != null) {
                        existingControle.setDate(controle.getDate());
                    }
                    if (controle.getCoefCont() != null) {
                        existingControle.setCoefCont(controle.getCoefCont());
                    }
                    if (controle.getType() != null) {
                        existingControle.setType(controle.getType());
                    }

                    return existingControle;
                }
            )
            .map(controleRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Controle> findAll(Pageable pageable) {
        log.debug("Request to get all Controles");
        return controleRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Controle> findOne(Long id) {
        log.debug("Request to get Controle : {}", id);
        return controleRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Controle : {}", id);
        controleRepository.deleteById(id);
    }
}
