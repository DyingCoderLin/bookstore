package org.example.bookstore.service;

import org.example.bookstore.dto.BookDTO;
import org.example.bookstore.entity.Book;

import java.util.List;

public interface BookService {

    public List<BookDTO> findAll();

    public Book findByBookId(Integer bookID);

    public Book save(Book book);

}
