package com.tuke.explo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    private String player;

    private String password;

    private Integer xp;

    private Integer questline;

    public User(){
    }

    public User(String player, String password) {
        this.player = player;
        this.password = password;
        this.xp = 0;
        this.questline = 0;
    }

    public String getPlayer(){
        return player;
    }

    public String getPassword(){
        return password;
    }

    public Integer getXp(){ return xp; }

    public Integer getQuestline(){return questline; }

    public void moveQuestline(){
        this.questline = (this.questline != null ? this.questline : 0) + 1;
    }

    public void addXp(Integer xp){
        this.xp = (this.xp != null ? this.xp : 0) + xp;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
