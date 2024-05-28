package org.example.bookstore.controllers;

import org.example.bookstore.daoimpl.BookDaoImpl;
import org.example.bookstore.dto.BookDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.utils.MyUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.example.bookstore.entity.Book;
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

    @GetMapping("/getBookByID/{bookID}")
    public BookDTO getBookById(@PathVariable int bookID) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Querying Book by ID: "+bookID);
        return new BookDTO(bookService.findByBookId(bookID));
    }

    @GetMapping("/getAllBooks")
    public List<BookDTO> getAllBooks(){
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Querying Books");

        // 从 Data 类中获取书籍数据
        return bookService.findAll();
    }

    @PostMapping("/addBook")
    public Response addBook(@RequestBody Map<String,Object> requestBody) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        Book book = new Book();
        String title = (String)requestBody.get("title");
        book.setTitle(title);
        Object inventory = requestBody.get("inventory");
        if(inventory instanceof Integer) {
            book.setInventory((Integer) inventory);
        }
        else if(inventory instanceof String) {
            book.setInventory(Integer.parseInt((String) inventory));
        }
        Object price = requestBody.get("price");
        log.info("Price: "+price);
        if(price instanceof Integer) {
            Integer priceInCent = (Integer) price;
            priceInCent *= 100;
            book.setPrice(priceInCent);
        }
        else if(price instanceof Double) {
            Double priceInCent = (Double) price;
            priceInCent *= 100;
            book.setPrice(priceInCent.intValue());
        }
        else if(price instanceof String) {
            Double priceInCent = Double.parseDouble((String) price);
            priceInCent *= 100;
            book.setPrice(priceInCent.intValue());
        }
        log.info("Price: "+book.getPrice());
        book.setAuthor((String) requestBody.get("author"));
        book.setIsbn((String) requestBody.get("isbn"));
        book.setIsAvailable(true);
        bookService.save(book);
        return new Response(200, "书籍"+title+"添加成功");
    }

    @PostMapping("/updateBook")
    public Response updateBook(@RequestBody Map<String,Object> requestBody) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        Book book = bookService.findByBookId((Integer) requestBody.get("bookID"));
        log.info("Updating Book: "+book.getTitle());
        String title = (String)requestBody.get("title");
        book.setTitle(title);
        Object inventory = requestBody.get("inventory");
        if(inventory instanceof Integer) {
            book.setInventory((Integer) inventory);
        }
        else if(inventory instanceof String) {
            book.setInventory(Integer.parseInt((String) inventory));
        }
        Object price = requestBody.get("price");
        log.info("Price: "+price);
        if(price instanceof Integer) {
            Integer priceInCent = (Integer) price;
            priceInCent *= 100;
            book.setPrice(priceInCent);
        }
        else if(price instanceof Double) {
            Double priceInCent = (Double) price;
            priceInCent *= 100;
            book.setPrice(priceInCent.intValue());
        }
        else if(price instanceof String) {
            Double priceInCent = Double.parseDouble((String) price);
            priceInCent *= 100;
            book.setPrice(priceInCent.intValue());
        }
        log.info("Price: "+book.getPrice());
        book.setAuthor((String) requestBody.get("author"));
        book.setIsbn((String) requestBody.get("isbn"));
        bookService.save(book);
        return new Response(200, "书籍信息更新成功");
    }

    @GetMapping("/deleteBookByID/{bookID}")
    public Response deleteBookByID(@PathVariable int bookID) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Deleting Book by ID: " + bookID);
        Response response = bookService.deleteByBookID(bookID);
        return response;
    }

}

