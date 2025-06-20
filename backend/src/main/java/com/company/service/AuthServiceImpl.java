package com.company.service;

import com.company.entity.User;
import com.company.payload.ForgotPasswordRequest;
import com.company.payload.ResetPasswordRequest;
import com.company.payload.SigninRequest;
import com.company.payload.SignupRequest;
import com.company.repository.UserRepository;
import com.company.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private EmailService emailService;                     

    private final Map<String, String> resetTokenStore = new HashMap<>();

    @Override
    public void signup(SignupRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());

        userRepository.save(user);
    }

    @Override
    public String signin(SigninRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        return jwtUtil.generateToken(user.getUsername());
    }

    @Override
    public void signout(String token) {
        jwtUtil.invalidateToken(token);
    }

/*
    ini sudah benar
*/
    @Override
    public void forgotPassword(ForgotPasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Email not found"));

        // Buat token JWT untuk reset password (misalnya berlaku 15 menit)
        String token = jwtUtil.generatePasswordResetToken(user.getUsername());

        // Kirim email dengan link reset password
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
    }

    @Override
    public void resetPassword(ResetPasswordRequest request) {
        // Ambil token dari request
        String token = request.getToken();

        // Validasi token JWT dan ambil username
        String username = jwtUtil.validatePasswordResetToken(token);

        if (username == null || username.isEmpty()) {
            throw new IllegalArgumentException("Invalid or expired reset token");
        }

        // Cari user berdasarkan username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Validasi panjang password
        if (request.getNewPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        // Hash password baru & update user
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

}

