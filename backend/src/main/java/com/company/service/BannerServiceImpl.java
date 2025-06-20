package com.company.service;

import com.company.entity.Banner;
import com.company.entity.User;
import com.company.payload.BannerResponse;
import com.company.repository.BannerRepository;
import com.company.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;
    private final UserRepository userRepository;

    public BannerServiceImpl(BannerRepository bannerRepository, UserRepository userRepository) {
        this.bannerRepository = bannerRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Banner uploadBanner(String title, String description, MultipartFile file) throws IOException {
        // Ambil user dari Spring Security Context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Banner banner = new Banner();
        banner.setTitle(title);
        banner.setDescription(description);
        banner.setImage(file.getBytes());
        banner.setContentType(file.getContentType());
        banner.setActive(true);
        banner.setUser(user);

        return bannerRepository.save(banner);
    }

    @Override
    public List<BannerResponse> getActiveBanners() {
        return bannerRepository.findByActiveTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<BannerResponse> getAllBanners() {
        return bannerRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBanner(Long id) {
        bannerRepository.findById(id).ifPresent(banner -> {
            banner.setActive(false);
            bannerRepository.save(banner);
        });
    }

    private BannerResponse mapToResponse(Banner banner) {
        String base64Image = banner.getImage() != null
                ? "data:" + banner.getContentType() + ";base64," +
                Base64.getEncoder().encodeToString(banner.getImage())
                : null;

        return new BannerResponse(
                banner.getId(),
                banner.getTitle(),
                banner.getDescription(),
                base64Image,
                banner.isActive()
        );
    }
}