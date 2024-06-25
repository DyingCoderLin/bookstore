package org.example.bookstore.controllers;

import jakarta.servlet.http.HttpSession;
import org.example.bookstore.daoimpl.BookDaoImpl;
import org.example.bookstore.dto.BookDTO;
import org.example.bookstore.dto.Response;
import org.example.bookstore.service.UserService;
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

    @Autowired
    private UserService userService;

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
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        if(userService.findByUserID(userID).getIsAdmin() == false) {
            return new Response(401, "非管理员无法添加书籍");
        }
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
        Object img = requestBody.get("img");
        if(img instanceof String) {
            book.setImg((String) requestBody.get("img"));
        }
        else {
            book.setImg("");
        }
//        String img = (String)requestBody.get("img");
//        if(img != null && !img.equals("")) {
//            book.setImg((String) requestBody.get("img"));
//        }
        String description = (String)requestBody.get("description");
        book.setDescription(description);
        String detail = (String)requestBody.get("detail");
        book.setDetail(detail);
        book.setIsAvailable(true);
        log.info("Adding Book: "+book.getTitle());
        bookService.save(book);
        return new Response(200, "书籍"+book.getTitle()+"添加成功");
    }

    @PostMapping("/updateBook")
    public Response updateBook(@RequestBody Map<String,Object> requestBody) {
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        if(userService.findByUserID(userID).getIsAdmin() == false) {
            return new Response(401, "非管理员无法更新书籍信息");
        }
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
        String img = (String)requestBody.get("img");
        if(img != null && !img.equals("")) {
            book.setImg((String) requestBody.get("img"));
        }
        bookService.save(book);
        return new Response(200, "书籍信息更新成功");
    }

    @GetMapping("/deleteBookByID/{bookID}")
    public Response deleteBookByID(@PathVariable int bookID) {
        HttpSession session = MyUtils.getSession();
        String userID = (String) session.getAttribute("userID");
        if(userService.findByUserID(userID).getIsAdmin() == false) {
            return new Response(401, "非管理员无法删除书籍");
        }
        final Logger log = LoggerFactory.getLogger(BookController.class);
        log.info("Deleting Book by ID: " + bookID);
        Response response = bookService.deleteByBookID(bookID);
        return response;
    }

    @PostMapping("/getBooksByPageandTitle")
    public Response getBooksByPageandTitle(@RequestBody Map<String,Object> requestBody) {
        final Logger log = LoggerFactory.getLogger(BookController.class);
        Integer page = (Integer) requestBody.get("page");
        Integer size = (Integer) requestBody.get("size");
        String searchTitle = (String) requestBody.get("search");
        log.info("Querying Books by Page: "+page+" Size: "+size);
        //读取findAll的前五个并返回
        return bookService.findByPageandTitle(page, size,searchTitle);
    }



}

