package org.example.bookstore.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.repository.CartItemRepository;
import org.example.bookstore.model.CartItem;

import java.util.List;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    public List<CartItem> findAll() {
        return cartItemRepository.findAll();
    }

    public void save(CartItem cartItem) {
        cartItemRepository.save(cartItem);
    }

//    public void deleteById(Integer cartItemId) {
//        cartItemRepository.deleteById(cartItemId);
//    }

    public void delete(CartItem cartItem) {
        cartItem.detach();
        cartItemRepository.delete(cartItem);
    }

    public CartItem findByCartItemId(Integer cartItemID) {
        return cartItemRepository.findByCartItemID(cartItemID);
    }
}
