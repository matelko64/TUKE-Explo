package com.tuke.explo.server.webservice;

import com.tuke.explo.entity.User;
import com.tuke.explo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "*")
public class UserServiceRest {

    @Autowired
    private UserService userService;

    @PostMapping
    public void setUser(@RequestBody User user){
        userService.setUser(user);
    }

    @PostMapping("/login")
    public boolean login(@RequestBody User user){
        return userService.login(user.getPlayer(), user.getPassword());
    }

    @PostMapping("/addXp")
    public void addXp(@RequestBody AddXpRequest request) {
        userService.addXp(request.getPlayer(), request.getAmount());
    }

    @GetMapping("/questline/{player}")
    public int getQuestline(@PathVariable String player) {
        return userService.getQuestline(player);
    }

    @GetMapping("/xp/{player}")
    public int getXp(@PathVariable String player) {
        return userService.getXp(player);
    }

    @PostMapping("/moveQuestline")
    public void moveQuestline(@RequestBody PlayerRequest request) {
        userService.moveQuestline(request.getPlayer());
    }

    @GetMapping("/achievements/{player}")
    public String[][] getAchievements(@PathVariable String player) {
        return userService.getAchievements(player);
    }

    @PostMapping("/achievements")
    public void setAchievements(@RequestBody SetAchievementsRequest request) {
        userService.setAchievements(request.getPlayer(), request.getAchievements());
    }

    @PostMapping("/addAchievement")
    public void addAchievement(@RequestBody AddAchievementRequest request) {
        userService.addAchievement(request.getPlayer(), request.getAchievement());
    }

    public static class AddXpRequest {
        private String player;
        private int amount;

        public String getPlayer() { return player; }
        public void setPlayer(String player) { this.player = player; }
        public int getAmount() { return amount; }
        public void setAmount(int amount) { this.amount = amount; }
    }

    public static class PlayerRequest {
        private String player;

        public String getPlayer() { return player; }
        public void setPlayer(String player) { this.player = player; }
    }

    public static class SetAchievementsRequest {
        private String player;
        private String[][] achievements;

        public String getPlayer() { return player; }
        public void setPlayer(String player) { this.player = player; }
        public String[][] getAchievements() { return achievements; }
        public void setAchievements(String[][] achievements) { this.achievements = achievements; }
    }

    public static class AddAchievementRequest {
        private String player;
        private String[] achievement;

        public String getPlayer() { return player; }
        public void setPlayer(String player) { this.player = player; }
        public String[] getAchievement() { return achievement; }
        public void setAchievement(String[] achievement) { this.achievement = achievement; }
    }
}
