package com.company.payload;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class BannerRequest {
    private String title;
    private String description;
    private MultipartFile image;
}