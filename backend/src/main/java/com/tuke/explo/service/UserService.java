package com.tuke.explo.service;

import com.tuke.explo.entity.User;

public interface UserService {
    void setUser(User user);
    boolean login(String player, String password);
    User getUser(String player, String password);
    void addXp(String player, int amount);
    int getQuestLine(String player);
    void moveQuestLine(String player);
}
