package org.example.bookstore.controllers;

import org.example.bookstore.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.service.*;

import java.util.*;

@RestController
@RequestMapping("/api") // 指定父路径为/api
public class CartItemController {
    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @GetMapping("/getAllCartItems")
    public List<CartItemData> getAllCartItems(@CookieValue(value = "userID", required = false) String userID){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        log.info(userID + " is querying CartItems");
        User user = userService.findByUserID(userID);
//        log.info("size "+user.getCartItems().size());
        List<CartItemData> cartItems = new ArrayList<>();
        for(CartItem cartItem : user.getCartItems()){
            CartItemData cartItemData = new CartItemData(cartItem);
            cartItems.add(cartItemData);
        }
        return cartItems;
    }

    @GetMapping("/addCartItem/{bookId}")
    public Response addCartItem(@CookieValue(value = "userID", required = false) String userID, @PathVariable int bookId){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        log.info(userID + " is adding CartItem with bookId: " + bookId);
        User user = userService.findByUserID(userID);
        Book book = bookService.findByBookId(bookId);
        //如果该书已经在购物车中
        if(!user.getCartItems().isEmpty()) {
            for (CartItem cartItem : user.getCartItems()) {
                if (cartItem.getBook().getId() == bookId) {
                    return new Response(200, "该书已经在购物车中");
                }
            }
        }
//        log.info("to here 0");
        CartItem cartItem = new CartItem();
//        log.info("to here 1");
        cartItem.setBook(book);
//        log.info("to here 2");
        cartItem.setCart_user(user);
//        log.info("to here 3");
        cartItem.setPrice(book.getPrice());
//        log.info("to here 4");
        cartItemService.save(cartItem);
//        log.info("to here 5");
        return new Response(200, "添加成功");
    }

    @GetMapping("/deleteCartItem/{cartItemID}")
    public Response deleteCartItem(@CookieValue(value = "userID", required = false) String userID, @PathVariable int cartItemID){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        log.info(userID + " is deleting CartItem with cartItemID: " + cartItemID);
        User user = userService.findByUserID(userID);
        List<CartItem> cartItems = user.getCartItems();
        for(CartItem cartItem : cartItems){
            if(cartItem.getCartItemID() == cartItemID){
                cartItemService.delete(cartItem);
                return new Response(200, "删除成功");
            }
        }
        return new Response(400, "删除失败");
    }

    @PostMapping("/changeCartItemNumber")
    public Response changeCartItemNumber(@CookieValue(value = "userID", required = false) String userID, @RequestBody Map<String, Integer> requestBody){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        User user = userService.findByUserID(userID);
        int cartItemID = requestBody.get("cartItemID");
        int quantity = requestBody.get("number");
        List<CartItem> cartItems = user.getCartItems();
        for(CartItem cartItem : cartItems){
            if(cartItem.getCartItemID() == cartItemID){
                cartItem.setQuantity(quantity);
                cartItemService.save(cartItem);
                return new Response(200, "修改成功");
            }
        }
        return new Response(400, "修改失败");
    }

}
