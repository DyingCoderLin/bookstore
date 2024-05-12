package org.example.bookstore.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.model.CartItem;
import org.example.bookstore.model.Book;
import org.example.bookstore.service.BookService;
import org.example.bookstore.service.CartItemService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api") // 指定父路径为/api
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private CartItemService cartItemService;

    @GetMapping("/getBookById/{bookId}")
    public Book getBookById(@PathVariable int bookId) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Querying Book by ID: "+bookId);
        return bookService.findByBookId(bookId);
    }

    @GetMapping("/getAllBooks")
    public List<Book> getAllBooks(){
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Querying Books");

        // 从 Data 类中获取书籍数据
        return  bookService.findAll();
    }

    @PostMapping("/order")
    //根据前端传来的idemId对应cartData中的数据，并进行log，返回给前端成功信息
    public ResponseEntity<String> handleOrder(@RequestBody Map<String, Object> orderInfo) {
        //解读前端body传来的数据
//        final Logger log = LoggerFactory.getLogger(BookController.class);
//
//        String address = (String) orderInfo.get("address");
//        String receiver = (String) orderInfo.get("receiver");
//        String tel = (String) orderInfo.get("tel");
//
//        List<Integer> itemIds = (List<Integer>) orderInfo.get("itemIds");
//
//        StringBuilder logMessage = new StringBuilder();
//
//        logMessage.append("\n")
//                .append("Order Info: \n")
//                .append("Receiver: ").append(receiver).append("\n ")
//                .append("Tel: ").append(tel).append("\n ")
//                .append("Address: ").append(address).append("\n ")
//                .append("ItemIds: ").append(itemIds).append("\n ");
//        for (int itemId : itemIds) {
//            CartItem item = cartItemService.findAll().stream()
//                    .filter(cartItem -> cartItem.getId() == itemId)
//                    .findFirst().orElse(null);
//            if (item != null) {
//                logMessage.append("Ordering Book: ").append(item.getTitle()).append("\n");
//            }
//        }
//
//        log.info(logMessage.toString());
//
//        //返回给前端成功信息
        return ResponseEntity.ok("Order Success");
    }
}

