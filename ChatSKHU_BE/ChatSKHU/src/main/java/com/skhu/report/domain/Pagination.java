package com.skhu.report.domain;

import lombok.Data;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Data
public class Pagination {
    int pg;
    int sz;
    String st = "";

    public Pagination(int pg, int sz, String st) {
        this.pg = pg > 0 ? pg : 1;
        this.sz = sz > 0 ? sz : 10;
        this.st = st != null ? st : "";
    }

}