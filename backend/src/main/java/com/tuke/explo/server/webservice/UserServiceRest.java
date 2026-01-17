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

    @PostMapping("/moveQuestline")
    public void moveQuestline(@RequestBody PlayerRequest request) {
        userService.moveQuestline(request.getPlayer());
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
}
