package com.tuke.explo.service;

import com.tuke.explo.entity.User;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
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
}