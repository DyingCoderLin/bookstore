package org.example.bookstore.dao;

import org.example.bookstore.entity.Book;

import java.util.List;

public interface BookDao {
    public Book findByBookID(int bookID);
    public List<Book> findAll();
    public Book save(Book book);
    public void delete(Book book);
}
