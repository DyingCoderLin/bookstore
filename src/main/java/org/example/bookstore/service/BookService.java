package org.example.bookstore.service;

import org.example.bookstore.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.bookstore.repository.BookRepository;
import java.util.List;


@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    public Book findByBookId(Integer bookID) {
        return bookRepository.findByBookID(bookID);
    }

    public Book save(Book book) {
        return bookRepository.save(book);
    }

}
