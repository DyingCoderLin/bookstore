package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.CartItemDao;
import org.example.bookstore.dto.CartItemDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.dto.UserDTO;
import org.example.bookstore.entity.CartItem;
import org.example.bookstore.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.CartItemService;

import java.util.List;
import java.util.stream.Collectors;

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
//        cartItem.detach();
        cartItemDao.delete(cartItem);
    }

    public CartItem findByCartItemId(Integer cartItemID) {
        return cartItemDao.findByCartItemID(cartItemID);
    }
    public Response findByPageandTitle(int page, int size, String search, User cartUser){
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<CartItem> cartItemPage = cartItemDao.findByPageandTitle(pageable, search, cartUser);

        List<CartItemDTO> cartItemDTOs = cartItemPage.getContent().stream()
                .map(CartItemDTO::new)
                .collect(Collectors.toList());

        class Data {
            public List<CartItemDTO> cartItemDTOs;
            public int size;

            public Data(List<CartItemDTO> cartItemDTOs, int size) {
                this.cartItemDTOs = cartItemDTOs;
                this.size = size;
            }
        }
        Data data = new Data(cartItemDTOs, cartItemDao.countwithUserIDandTitle(cartUser, search));
        return new Response<Data>(200, "查询成功", data);
    }
}
