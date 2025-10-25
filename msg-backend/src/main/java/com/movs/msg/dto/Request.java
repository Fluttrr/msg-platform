package com.movs.msg.dto;

import com.fasterxml.jackson.databind.JsonNode;

import lombok.Data;

@Data
public class Request {
    private String type;
    private JsonNode payload;
}
