package com.movs.User;

public class Users {
    private int blocker;
    private int blockee;

    public void setBlocker(int user) {
        blocker=user;
    }

    public int getBlocker() {
        return blocker;
    }

    public void setBlockee(int user) {
        blockee=user;
    }

    public int getBlockee() {
        return blockee;
    }
}
