package com.company.service.webSettings;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private final String uploadDir = "uploads/";

    @Override
    public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        try {
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            return "/uploads/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }


/*
    BANNER
*/


    // Simulasi penyimpanan di memory dengan map (key -> data)
 /*   private final Map<String, byte[]> storage = new HashMap<>();

    @Override
    public byte[] saveFile(byte[] data) throws IOException {
        // Di sini kita generate random key sebagai contoh
        String key = "file_" + System.currentTimeMillis();
        storage.put(key, data);
        // Kembalikan data (atau key kalau mau ubah interface)
        return data;
    }

    @Override
    public byte[] getFile(String key) throws IOException {
        byte[] data = storage.get(key);
        if (data == null) {
            throw new IOException("File not found with key " + key);
        }
        return data;
    }

    @Override
    public void deleteFile(String key) throws IOException {
        storage.remove(key);
    }
*/

}

