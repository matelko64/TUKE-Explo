package com.tuke.explo.service;

import com.tuke.explo.entity.User;

public interface UserService {
    boolean login(String player, String password);
    int getQuestline(String player);
    int getXp(String player);
    String[][] getAchievements(String player);
    User getUser(String player, String password);
    void addAchievement(String player, String[] achievement);
    void addXp(String player, int amount);
    void moveQuestline(String player);
    void setAchievements(String player, String[][] achievements);
    void setUser(User user);
}
