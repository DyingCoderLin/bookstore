package org.example.bookstore.controllers;

import org.example.bookstore.daoimpl.BookDaoImpl;
import org.example.bookstore.dto.BookDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.entity.Book;
import org.example.bookstore.service.BookService;
import org.example.bookstore.service.CartItemService;

import java.util.List;

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
    public List<BookDTO> getAllBooks(){
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Querying Books");

        // 从 Data 类中获取书籍数据
        return bookService.findAll();
    }
}

