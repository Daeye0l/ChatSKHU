package com.skhu.report.domain;

import lombok.Data;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Data
public class Pagination {
    int pg = 1;
    int sz = 10;
    int recordCount;
    String st = "";

    public int getFirstRecordIndex() {
        return (pg - 1) * sz;
    }

    public String getQueryString() {
        try {
            String encoded = URLEncoder.encode(st, "UTF-8");
            return String.format("pg=%d&sz=%d&st=%s", pg, sz, encoded);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return String.format("pg=%d&sz=%d&st=%s", pg, sz, st);
    }


}