package com.company.repository;

import com.company.entity.Logo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogoRepository extends JpaRepository<Logo, Long> {
    List<Logo> findAllByOrderByCreatedAtDesc();
}