package com.movs.User.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movs.User.Groups;
import com.movs.User.User;
import com.movs.User.UserService;
import com.movs.User.Users;

@RestController
@RequestMapping("/users")
public class    RESTController {

    @Autowired
    private UserService userService;

    //POST-MAPPING

    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
        userService.createUser(user.getUsername());
        return getUserByUsername(user.getUsername());
    }

    @PostMapping("/createGroup/{uid}") 
    public Groups createGroup(@RequestBody Groups group, @PathVariable int uid) {
        userService.subscribe(userService.createGroup(group.getName()), uid);
        return getGroupByGroupName(group.getName());
    }

    @PostMapping("/subscribe") //localhost:8080/users/join
    public void subscribe(@RequestBody int gid, @RequestBody int uid) {
        userService.subscribe(gid,uid);
    }

    @PostMapping("/block")
    public void block(@RequestBody Users users) {
        userService.block(users.getBlocker(), users.getBlockee());
    }

    @PostMapping("/banUser")
    public void banUser(@RequestBody User user) {
        userService.banUser(user.getId());
    }

    ////////UPDATE-MAPPING//////////////////////////////////////////////

    @PatchMapping("/changeUserDescr")
    public void changeUserDescr(@RequestBody User user) {
        userService.changeUserDescr(user.getId(),user.getDescr());
    }

    @PatchMapping("/changeGroupDescr")
    public void changeGroupDescr(@RequestBody Groups group) {
        userService.changeGroupDescr(group.getId(), group.getDescr());
    }

    ////////GET-MAPPING////////////////////////////////////////////////

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/uid/{id}") //localhost:8080/users/10
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/groups")
    public List<Groups> getAllGroups(){
        return userService.getAllGroups();
    }

    @GetMapping("/gid/{id}")
    public Groups getGroupByID(@PathVariable int id) {
        return userService.getGroupByID(id);
    }

    @GetMapping("/groupname/{name}")
    public Groups getGroupByGroupName(@PathVariable String name) {
        return userService.getGroupByGroupName(name);
    }

    @GetMapping("/subscribers/{gid}")
    public List<Integer> getSubscribers(@PathVariable int gid){
        return userService.getSubscribers(gid);
    }

    @GetMapping("/subscribed/{uid}") 
    public List<Integer> getSubscribed(@PathVariable int uid) {
        return userService.getSubscribed(uid);
    }
    
    @GetMapping("/isSubscribed/{gid}/{uid}")
    public boolean isSubscribed(@PathVariable int gid, @PathVariable int uid) {
        return userService.isSubscribed(gid,uid);
    }

    @GetMapping("/blocking/{id}")
    public List<Integer> getBlocking(@PathVariable int id) {
        return userService.getBlocking(id);
    }

    @GetMapping("/blockedBy/{id}")
    public List<Integer> getBlockedBy(@PathVariable int id) {
        return userService.getBlockedBy(id);
    }

    @GetMapping("/isBlocked/{blocker}/{blockee}")
    public boolean isUserBlocked(@PathVariable int blocker, @PathVariable int blockee) {
        return userService.isUserBlocked(blocker,blockee);
    }

    @GetMapping("/banned/{id}")
    public boolean isBanned(@PathVariable int id) {
        return userService.isBanned(id);
    }

    @GetMapping("/isAllowed/{sender}/{reciever}/{thing}")
    public boolean isAllowed(@PathVariable int sender, @PathVariable int reciever, @PathVariable String thing) {
        return userService.isAllowed(sender,reciever,thing);
    }

    ////////DELETE-MAPPING/////////////////////////////////////////////////
    
    @DeleteMapping("/unblock/{blocker}/{blockee}")
    public void unblockUser(@PathVariable int blocker, @PathVariable int blockee) {
        userService.unblockUser(blocker, blockee);
    }
}

    //TODO: Testing for Cascading deletes