package org.example.bookstore.repository;

import org.example.bookstore.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;

public interface BookRepository extends JpaRepository<Book, Integer>{
    public Book findByBookID(int bookID);

    @Query("SELECT b FROM Book b WHERE b.isAvailable = true")
    Page<Book> findBooksByPage(Pageable pageable);

    @Query("SELECT COUNT(b) FROM Book b WHERE b.isAvailable = true")
    long count();

    Page<Book> findByTitleContainingAndAndIsAvailableTrue(String title, Pageable pageable);

    long countByTitleContainingAndIsAvailableTrue(String title);
}
