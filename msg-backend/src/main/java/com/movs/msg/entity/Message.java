package com.movs.msg.entity;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

@Entity
@Data
@JsonSerialize
@SequenceGenerator(name = "message_seq", sequenceName = "message_seq", allocationSize = 1)

public class Message implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "message_seq")
    private int id;
    private int sender;
    private int recipient;
    private String content;
    @JsonProperty("is_group_msg")
    private boolean isGroupMsg = false;

    @Temporal(TemporalType.TIMESTAMP)
    private Date created_at = new Date();
}
