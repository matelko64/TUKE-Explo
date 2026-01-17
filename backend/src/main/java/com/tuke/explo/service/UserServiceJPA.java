package com.tuke.explo.service;

import com.tuke.explo.entity.User;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserServiceJPA implements UserService {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void setUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public boolean login(String player, String password) {
        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.player = :player AND u.password = :password", User.class);
        query.setParameter("player", player);
        query.setParameter("password", password);

        try{
            query.getSingleResult();
            return true;
        } catch(NoResultException e){
            return false;
        }
    }

    @Override
    public User getUser(String player, String password) {
        TypedQuery<User> query = entityManager.createQuery("SELECT u FROM User u WHERE u.player = :player AND u.password = :password", User.class);
        query.setParameter("player", player);
        query.setParameter("password", password);

        try{
            return query.getSingleResult();
        } catch(NoResultException e){
            return null;
        }
    }

    @Override
    public void addXp(String player, int amount) {
        User user = entityManager.find(User.class, player);
        if (user != null) {
            user.addXp(amount);
            entityManager.merge(user);
        }
    }

    @Override
    public int getQuestline(String player) {
        User user = entityManager.find(User.class, player);
        return user != null ? user.getQuestline() : 0;
    }

    @Override
    public void moveQuestline(String player) {
        User user = entityManager.find(User.class, player);
        if (user != null) {
            user.moveQuestline();
            entityManager.merge(user);
        }
    }
}