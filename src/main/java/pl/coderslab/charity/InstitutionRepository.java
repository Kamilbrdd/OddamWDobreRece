package pl.coderslab.charity;

import org.springframework.data.jpa.repository.JpaRepository;

    public interface InstitutionRepository extends JpaRepository<Institution, Long> {
    }
