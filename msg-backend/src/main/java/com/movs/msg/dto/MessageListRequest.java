package com.movs.msg.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MessageListRequest {
    private int id;
    @JsonProperty("is_group")
    private boolean isGroup;
}
