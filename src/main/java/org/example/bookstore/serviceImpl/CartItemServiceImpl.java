package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.CartItemDao;
import org.example.bookstore.entity.CartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.CartItemService;

import java.util.List;

@Service
public class CartItemServiceImpl implements CartItemService{
    @Autowired
    private CartItemDao cartItemDao;

    @Override
    public List<CartItem> findAll() {
        return cartItemDao.findAll();
    }

    public void save(CartItem cartItem) {
        cartItemDao.save(cartItem);
    }

    public void delete(CartItem cartItem) {
        cartItem.detach();
        cartItemDao.delete(cartItem);
    }

    public CartItem findByCartItemId(Integer cartItemID) {
        return cartItemDao.findByCartItemID(cartItemID);
    }
}
