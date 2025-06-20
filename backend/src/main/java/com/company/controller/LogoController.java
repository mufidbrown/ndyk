package com.company.controller;

import com.company.dto.LogoResponseDTO;
import com.company.service.LogoService;
import com.company.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/logo")
public class LogoController {

    private final LogoService logoService;

    @Autowired
    public LogoController(LogoService logoService) {
        this.logoService = logoService;
    }

    /*@PostMapping("/upload")
    public ResponseEntity<?> uploadLogo(@RequestParam("file") MultipartFile file) {
        try {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is required");
            }
            LogoResponseDTO response = logoService.uploadLogo(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading logo: " + e.getMessage());
        }
    }*/

    @PostMapping("/upload")
    public ResponseEntity<LogoResponseDTO> uploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
        LogoResponseDTO response = logoService.uploadLogo(file);
        return ResponseEntity.ok(response);
    }

   /* @GetMapping("/get")
    public ResponseEntity<?> getAllLogos() {
        try {
            List<LogoResponseDTO> logos = logoService.getAllLogos();
            return ResponseEntity.ok(logos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching logos: " + e.getMessage());
        }
    }*/

    @GetMapping("/get")
    public ResponseEntity<List<LogoResponseDTO>> getAllLogos() {
        List<LogoResponseDTO> logos = logoService.getAllLogos();
        return ResponseEntity.ok(logos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLogoById(@PathVariable Long id) {
        try {
            LogoResponseDTO logo = logoService.getLogoById(id);
            if (logo == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(logo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching logo: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateLogo(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId
    ) {
        try {
            LogoResponseDTO updatedLogo = logoService.updateLogo(id, file, userId);
            return ResponseEntity.ok(updatedLogo);
        } catch (Exception e) {
            e.printStackTrace(); // <== Penting untuk debug
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update logo");
        }
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> toggleLogoStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> statusRequest) {
        try {
            Boolean active = statusRequest.get("active");
            if (active == null) {
                return ResponseEntity.badRequest().body("Active status is required");
            }
            LogoResponseDTO updatedLogo = logoService.toggleLogoStatus(id, active);
            return ResponseEntity.ok(updatedLogo);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating logo status: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLogo(@PathVariable Long id) {
        try {
            logoService.deleteLogo(id);
            return ResponseEntity.ok("Logo deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting logo: " + e.getMessage());
        }
    }
}


// Endpoint untuk upload logo
//    @PostMapping("/upload")
//    @PreAuthorize("isAuthenticated()") // Memastikan hanya user yang terautentikasi yang bisa meng-upload logo
//    public ResponseEntity<LogoResponseDTO> uploadLogo(@RequestParam("file") MultipartFile file) throws IOException {
//        LogoResponseDTO logoResponse = logoService.uploadLogo(file);  // Mengirim file ke logoService untuk diproses
//        return ResponseEntity.ok(logoResponse);  // Mengembalikan response dengan data logo
//    }
//
//    // Endpoint untuk mendapatkan logo
//    @GetMapping
//    public ResponseEntity<Optional<LogoResponseDTO>> getLogo() {
//        Optional<LogoResponseDTO> logoResponse = logoService.getLogo();  // Mendapatkan logo terakhir dari logoService
//        return ResponseEntity.ok(logoResponse);  // Mengembalikan response dengan data logo
//    }




