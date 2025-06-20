package com.company.service;

import com.company.dto.LogoResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface LogoService {
    LogoResponseDTO uploadLogo(MultipartFile file) throws IOException;
    List<LogoResponseDTO> getAllLogos();
    LogoResponseDTO getLogoById(Long id);
    LogoResponseDTO updateLogo(Long id, MultipartFile file, Long userId);
    LogoResponseDTO toggleLogoStatus(Long id, boolean active);
    void deleteLogo(Long id);
}