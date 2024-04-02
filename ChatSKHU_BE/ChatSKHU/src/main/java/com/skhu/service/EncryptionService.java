package com.skhu.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class EncryptionService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public EncryptionService(){
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public String encrypt(String input){
        return bCryptPasswordEncoder.encode(input);
    }
}
