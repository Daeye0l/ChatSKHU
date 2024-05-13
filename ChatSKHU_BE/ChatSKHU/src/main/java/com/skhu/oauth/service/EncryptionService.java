package com.skhu.oauth.service;

import org.springframework.stereotype.Service;

@Service
public interface EncryptionService {
    String encrypt(String input);
    boolean match(String input, String encrypted);
    }
