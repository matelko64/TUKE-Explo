package com.tuke.explo.server.webservice;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.tuke.explo.entity.User;
import com.tuke.explo.service.UserService;

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
}
