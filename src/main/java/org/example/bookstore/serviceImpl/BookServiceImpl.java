package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.BookDao;
import org.example.bookstore.entity.Book;
import org.example.bookstore.entity.CartItem;
import org.example.bookstore.service.CartItemService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.BookService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.example.bookstore.dto.*;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookDao bookDao;

    @Autowired
    private CartItemService cartItemService;

    @Override
    public List<BookDTO> findAll() {
        // 将所有book都转成bookdto并传回
        List<Book> books = bookDao.findAll();
        List<BookDTO> bookDTOs = new ArrayList<>();
        for(Book book : books){
            if(!book.getIsAvailable()){
                continue;
            }
            BookDTO bookDTO = new BookDTO(book);
            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }

    public Response findByPageandTitle(Integer page, Integer size,String SearchTitle) {
//        PageRequest pageRequest = PageRequest.of(page - 1, size);
        Pageable pageRequest = PageRequest.of(page - 1, size);
        Page<Book> bookPage = bookDao.findBooksByPageandTitle(pageRequest, SearchTitle);

        List<BookDTO> bookDTOs = bookPage.getContent().stream()
                .map(BookDTO::new)
                .collect(Collectors.toList());

        class Data {
            public List<BookDTO> bookDTOs;
            public int size;

            public Data(List<BookDTO> bookDTOs, int size) {
                this.bookDTOs = bookDTOs;
                this.size = size;
            }
        }

        Data data = new Data(bookDTOs, bookDao.countwithTitle(SearchTitle));
        return new Response<Data>(200, "查询成功", data);
    }

    public Book findByBookId(Integer bookID) {
        Book book = bookDao.findByBookID(bookID);
        if(book == null || !book.getIsAvailable()){
            return null;
        }
        return book;
    }

    public Book save(Book book) {
        return bookDao.save(book);
    }

    public Response deleteByBookID(Integer bookID) {
        Book book = bookDao.findByBookID(bookID);
        if(book == null){
            return new Response(400, "未找到要被删除书籍");
        }
        //遍历book的cartitems,将它们删除
        List<CartItem> cartItemsToDelete = new ArrayList<>();
        for(CartItem cartItem : book.getCartItems()){
            cartItemsToDelete.add(cartItem);
        }
        for(CartItem cartItem : cartItemsToDelete){
            book.getCartItems().remove(cartItem);
            cartItemService.delete(cartItem);
        }
        book.setIsAvailable(false);
        bookDao.save(book);
        return new Response(200, "删除成功");
    }


}

