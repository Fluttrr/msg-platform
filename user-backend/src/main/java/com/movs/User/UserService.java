package com.movs.User;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {


    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Create a new user
    public void createUser(String username) {
        String sql = "INSERT INTO users (username, descr) VALUES (?, ' ')";
        try {
            jdbcTemplate.update(sql, username);
            System.out.println();
        } catch (DuplicateKeyException e) {
            System.out.println("User " + username + " joins the MOVS-ChatApp");
        }

    }

    public int createGroup(String name) {
        String sql = "INSERT INTO usergroups (name, descr) VALUES (?, ' ')";
        try {
            jdbcTemplate.update(sql, name);
            return jdbcTemplate.queryForObject("SELECT id FROM usergroups WHERE name = ?", Integer.class, name);
        } catch (DuplicateKeyException e){
            System.out.println("Group already exists");
            return jdbcTemplate.queryForObject("SELECT id FROM usergroups WHERE name = ?", Integer.class, name);
        }
    }

    public void subscribe(int gid, int uid) {
        String sql = "INSERT INTO subscribers (uid, gid) VALUES (?, ?)";
        try {
            jdbcTemplate.update(sql, uid, gid);
        } catch (DuplicateKeyException e) {
            System.out.println("User is already subscribed to this group!");
        }
    }

    public void block(int blocker, int blockee) {
        String sql = "INSERT INTO blocked (blocker, blockee) VALUES (?, ?)";
        jdbcTemplate.update(sql,blocker,blockee);
    }

    public void banUser(int id) {
        String sql = "UPDATE users SET banned = TRUE WHERE id = ?";
        jdbcTemplate.update(sql,id);
    }

    public void changeUserDescr(int id, String descr) {
        String sql = "UPDATE users SET descr = ? WHERE id = ?";
        jdbcTemplate.update(sql, descr, id);
    }

    public void changeGroupDescr(int id, String descr) {
        String sql = "UPDATE usergroups SET descr = ? WHERE id = ?";
        jdbcTemplate.update(sql, descr, id);
    }

    public List<User> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    @SuppressWarnings("deprecation")
    public User getUserById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";
        try { return jdbcTemplate.queryForObject(sql, new Object[]{id}, new UserRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id: " + id + " not found!");
        }
    }

    @SuppressWarnings("deprecation")
    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        try { return jdbcTemplate.queryForObject(sql, new Object[]{username}, new UserRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User " + username + " not found!");
        }
    }

    public List<Groups> getAllGroups() {
        String sql = "SELECT * FROM usergroups";
        return jdbcTemplate.query(sql, new GroupRowMapper());
    }

    @SuppressWarnings("deprecation")
    public Groups getGroupByID(int id) {
        String sql = "SELECT * FROM usergroups WHERE id = ?";
        try { return jdbcTemplate.queryForObject(sql, new Object[]{id}, new GroupRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Group with id: " + id + " not found!");
        }
    }

    @SuppressWarnings("deprecation")
    public Groups getGroupByGroupName(String name) {
        String sql = "SELECT * FROM usergroups WHERE name = ?";
        try { return jdbcTemplate.queryForObject(sql, new Object[]{name}, new GroupRowMapper());
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Group " + name + " not found!");
        }
    }

    public List<Integer> getSubscribers(int gid) {
        String sql = "SELECT uid FROM subscribers WHERE gid = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, gid);
    }

    public List<Integer> getSubscribed(int uid) {
        String sql = "SELECT gid FROM subscribers WHERE uid = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, uid);
    }
    
    public boolean isSubscribed(int gid, int uid){
        String sql = "SELECT COUNT(*) FROM subscriber WHERE gid = ? AND uid = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, gid, uid);
        return count != null && count > 0;
    }

    public boolean isAllowed(int sender, int reciever, String type) {
        if(type.toLowerCase().equals("user"))
            return(!isUserBlocked(reciever, sender) && !isBanned(sender));
        return(!isBanned(sender));
    }

    public List<Integer> getBlocking(int id) {
        String sql = "SELECT blockee FROM blocked WHERE blocker = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, id);
    }

    public List<Integer> getBlockedBy(int id) {
        String sql = "SELECT blocker FROM blocked WHERE blockee = ?";
        return jdbcTemplate.queryForList(sql, Integer.class, id);
    }

    public boolean isUserBlocked(int blocker, int blockee) {
        String sql = "SELECT COUNT(*) FROM blocked WHERE blocker = ? AND blockee = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, blocker, blockee);
        return count != null && count > 0;
    }

    public boolean isBanned(int id) {
        String sql = "SELECT banned FROM users WHERE id = ?";
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject(sql, Boolean.class, id));
    }

    public void unblockUser(int blocker, int blockee) {
        String sql = "DELETE FROM blocked WHERE blocker = ? AND blockee = ?";
        jdbcTemplate.update(sql,blocker,blockee);
    }

    // RowMapper for mapping SQL result to User object
    private static class UserRowMapper implements RowMapper<User> {
        @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setUsername(rs.getString("username"));
        user.setDescr(rs.getString("descr"));
        user.setBanned(rs.getBoolean("banned"));
        return user;
        }
    }

    private static class GroupRowMapper implements RowMapper<Groups> {
        @Override
    public Groups mapRow(ResultSet rs, int rowNum) throws SQLException {
        Groups group = new Groups();
        group.setId(rs.getInt("id"));
        group.setName(rs.getString("name"));
        group.setDescr(rs.getString("descr"));
        return group;
        }
    }
}
