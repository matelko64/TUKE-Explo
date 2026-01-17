package com.tuke.explo.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    private String player;
    private String password;
    @Column(name = "questline")
    private int questline;
    private int xp;

    public User(){
    }

    public User(String player, String password) {
        this.player = player;
        this.password = password;
        this.questline = 0;
        this.xp = 0;
    }

    public void moveQuestline(){this.questline++;}

    public void addXp(int xp){this.xp += xp;}

    public String getPlayer(){return player;}

    public String getPassword(){return password;}

    public int getQuestline(){return questline;}

    public int getXp(){return xp;}

    public void setPlayer(String player){this.player = player;}

    public void setPassword(String password){this.password = password;}

    public void setQuestline(int questline){this.questline = questline;}

    public void setXp(int xp){this.xp = xp;}
}
