package com.company.service.webSettings;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileStorageService {
    String storeFile(MultipartFile file); // return URL/path

    /**
     * Simpan file byte[] dan kembalikan byte[] (misal untuk manipulasi jika perlu)
     */
/*
    byte[] saveFile(byte[] data) throws IOException;

    */
/**
     * Ambil file byte[] berdasarkan identifier (misal id, filename, atau key)
     *//*

    byte[] getFile(String key) throws IOException;

    */
/**
     * Hapus file berdasarkan identifier
     *//*

    void deleteFile(String key) throws IOException;
*/

}

