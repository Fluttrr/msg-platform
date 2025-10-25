package com.movs.msg;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movs.msg.entity.Message;

@RestController
@RequestMapping("/rest")
public class RESTController {

    @Autowired
    MessageRepository messageRepository;

    @GetMapping("/getContext/{id1}/{id2}")
    public List<Message> getContext(@PathVariable("id1") int id1, @PathVariable("id2") int id2) {
        return messageRepository.findMessagesBetweenUsers(id1, id2);
    }
}
