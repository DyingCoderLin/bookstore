package org.example.bookstore.daoimpl;

import org.example.bookstore.entity.CartItem;
import org.example.bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.example.bookstore.dao.CartItemDao;
import org.example.bookstore.repository.CartItemRepository;

import java.util.List;

@Repository
public class CartItemDaoImpl implements CartItemDao{
    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItem findByCartItemID(Integer cartItemID){
        return cartItemRepository.findByCartItemID(cartItemID);
    }

    public CartItem save(CartItem cartItem){
        return cartItemRepository.save(cartItem);
    }

    public List<CartItem> findAll(){
        return cartItemRepository.findAll();
    }

    public void delete(CartItem cartItem){
        cartItemRepository.deleteByCartItemID(cartItem.getCartItemID());
    }

    public int countwithUserIDandTitle(User user, String title){
        return (int)cartItemRepository.countByTitleContainingAndCartuser(title, user);
    }

    public Page<CartItem> findByPageandTitle(Pageable pageable,String search ,User cartUser){
        return cartItemRepository.findByTitleContainingAndCartuser(search, cartUser, pageable);
    }


}
