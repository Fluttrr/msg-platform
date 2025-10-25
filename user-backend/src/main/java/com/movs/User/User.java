package com.movs.User;

//Here we could use lombok getter/setters annotation thing

// Good Idea! This would save a lot of code in here ;-)
// Just put the Lombok dependency into the pom.xml and use @Getter and @Setter
public class User {
    private int id;
    private String username;
    private String descr;
    private boolean banned;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public void setBanned(boolean bool) {
        this.banned=bool;
    }

    public boolean getBanned() {
        return banned;
    }
}
