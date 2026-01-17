package com.tuke.explo.service;

import com.tuke.explo.entity.User;

public interface UserService {
    boolean login(String player, String password);
    int getQuestline(String player);
    User getUser(String player, String password);
    void addXp(String player, int amount);
    void moveQuestline(String player);
    void setUser(User user);
}
