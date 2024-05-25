package org.example.bookstore.serviceImpl;

import org.example.bookstore.dao.BookDao;
import org.example.bookstore.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.service.BookService;

import java.util.ArrayList;
import java.util.List;
import org.example.bookstore.dto.*;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookDao bookDao;

    @Override
    public List<BookDTO> findAll() {
        // 将所有book都转成bookdto并传回
        List<Book> books = bookDao.findAll();
        List<BookDTO> bookDTOs = new ArrayList<>();
        for(Book book : books){
            BookDTO bookDTO = new BookDTO(book);
            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }

    public Book findByBookId(Integer bookID) {
        return bookDao.findByBookID(bookID);
    }

    public Book save(Book book) {
        return bookDao.save(book);
    }

}

