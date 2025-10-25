package com.movs.msg.dto;

import lombok.Data;

@Data
public class Response<T> {
    private final String type;
    private final T payload;
}