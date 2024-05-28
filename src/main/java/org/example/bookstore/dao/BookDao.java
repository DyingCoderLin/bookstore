package org.example.bookstore.dao;

import org.example.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BookDao {
    public Book findByBookID(int bookID);
    public List<Book> findAll();
    public Book save(Book book);
    public void delete(Book book);
    public int count();
    public Page<Book> findBooksByPageandTitle(Pageable pageable, String title);
    public int countwithTitle(String title);
}
