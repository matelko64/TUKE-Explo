package com.tuke.explo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    private String player;

    private String password;

    public User(){
    }

    public User(String player, String password){
        this.player = player;
        this.password = password;
    }

    public String getPlayer(){
        return player;
    }

    public String getPassword(){
        return password;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}