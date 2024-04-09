package com.skhu.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public interface EncryptionService {
    String encrypt(String input);
    boolean match(String input, String encrypted);
    }
