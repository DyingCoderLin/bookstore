package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.entity.*;
import org.example.bookstore.dto.*;
import org.example.bookstore.utils.MyUtils;
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
    public List<CartItemDTO> getAllCartItems(){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        log.info(userID + " is querying CartItems");
        User user = userService.findByUserID(userID);
//        log.info("size "+user.getCartItems().size());
        List<CartItemDTO> cartItems = new ArrayList<>();
        for(CartItem cartItem : user.getCartItems()){
            CartItemDTO cartItemDTO = new CartItemDTO(cartItem);
            cartItems.add(cartItemDTO);
        }
        return cartItems;
    }

    @GetMapping("/addCartItem/{bookId}")
    public Response addCartItem(@PathVariable int bookId){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        log.info(userID + " is adding CartItem with bookId: " + bookId);
        User user = userService.findByUserID(userID);
        Book book = bookService.findByBookId(bookId);
        //如果该书已经在购物车中
        if(!user.getCartItems().isEmpty()) {
            for (CartItem cartItem : user.getCartItems()) {
                if (cartItem.getCartbook().getBookID() == bookId) {
                    return new Response(200, "该书已经在购物车中");
                }
            }
        }
        CartItem cartItem = new CartItem();
        cartItem.setCartbook(book);
        cartItem.setCartuser(user);
//        cartItem.setPrice(book.getPrice());
        cartItemService.save(cartItem);
        return new Response(200, "添加成功");
    }

    @PostMapping("/getCartItemsByPageAndTitle")
    public Response getCartItemsByPageAndTitle(@RequestBody Map<String, Object> requestBody){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        log.info("Get CartItems By Page And Title Request");
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        int page = (int) requestBody.get("page");
        int size = (int) requestBody.get("size");
        String title = (String) requestBody.get("search");
        log.info("page: " + page + " size: " + size + " title: " + title);
        log.info("size:" + user.getCartItems().size());
        return cartItemService.findByPageandTitle(page, size, title, user);
    }

    @GetMapping("/deleteCartItem/{cartItemID}")
    public Response deleteCartItem(@PathVariable int cartItemID){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        HttpSession session = MyUtils.getSession();
        if(session == null){
            return new Response(400, "请先登录");
        }
        String userID = (String) session.getAttribute("userID");
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
    public Response changeCartItemNumber(@RequestBody Map<String, Integer> requestBody){
        final Logger log = LoggerFactory.getLogger(CartItemController.class);
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        User user = userService.findByUserID(userID);
        int cartItemID = requestBody.get("cartItemID");
        int quantity = requestBody.get("number");
        List<CartItem> cartItems = user.getCartItems();
        for(CartItem cartItem : cartItems){
            if(cartItem.getCartItemID() == cartItemID){
                cartItem.setQuantity(quantity);
//                cartItem.setPrice(cartItem.getCartbook().getPrice() * quantity);
                cartItemService.save(cartItem);
                return new Response(200, "修改成功");
            }
        }
        return new Response(400, "修改失败");
    }

}
