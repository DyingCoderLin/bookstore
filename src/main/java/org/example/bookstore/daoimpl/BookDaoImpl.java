package org.example.bookstore.daoimpl;

import org.example.bookstore.entity.Book;
import org.example.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.example.bookstore.dao.BookDao;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findByBookID(int bookID) {
        return bookRepository.findByBookID(bookID);
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }
}
