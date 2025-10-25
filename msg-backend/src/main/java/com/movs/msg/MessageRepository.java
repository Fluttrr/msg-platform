package com.movs.msg;

import com.movs.msg.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Integer> {

    @Query("SELECT m FROM Message m WHERE m.isGroupMsg = FALSE AND ((m.sender = :user1 AND m.recipient = :user2) OR (m.sender = :user2 AND m.recipient = :user1)) ORDER BY m.created_at")
    List<Message> findMessagesBetweenUsers(@Param("user1") int user1, @Param("user2") int user2);

    @Query("SELECT m FROM Message m WHERE m.isGroupMsg = TRUE AND m.recipient = :group ORDER BY m.created_at")
    List<Message> findMessagesInGroup(@Param("group") int group);

    @Query("SELECT DISTINCT CASE WHEN m.sender = :user THEN m.recipient ELSE m.sender END FROM Message m WHERE (m.sender = :user OR m.recipient = :user) AND m.isGroupMsg = FALSE")
    List<Integer> findAllChats(@Param("user") int user);
}