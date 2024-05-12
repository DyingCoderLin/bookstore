package org.example.bookstore.repository;

import org.example.bookstore.model.Book;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer>{
    public Book findByBookID(int bookID);
}
