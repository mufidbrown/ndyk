package com.company.service;

import com.company.entity.Banner;
import com.company.entity.User;
import com.company.payload.BannerResponse;
import com.company.payload.BannerRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BannerService {
    Banner uploadBanner(String title, String description, MultipartFile file) throws IOException;

    List<BannerResponse> getActiveBanners();

    List<BannerResponse> getAllBanners();

    void deleteBanner(Long id);
}
