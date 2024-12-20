package org.example.bookstore.repository;

import org.example.bookstore.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE oi.title LIKE %:searchText% AND o.orderDate BETWEEN :startDate AND :endDate ORDER BY o.orderDate DESC")
    Page<Order> findOrdersByOrderItemTitleAndDateBetween(
            @Param("searchText") String searchText,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            Pageable pageable);


    @Query("SELECT DISTINCT o FROM Order o JOIN o.orderItems oi WHERE oi.title LIKE %:searchText% AND o.orderDate >= :startDate AND o.orderDate <= :endDate AND o.orderuser.userID = :userId ORDER BY o.orderDate DESC")
    Page<Order> findOrdersByOrderItemTitleAndUserIdAndDateBetween(
            @Param("searchText") String searchText,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("userId") String userId,
            Pageable pageable);

    @Query("SELECT COUNT(DISTINCT o) FROM Order o JOIN o.orderItems oi WHERE oi.title LIKE %:searchText% AND o.orderDate BETWEEN :startDate AND :endDate")
    long countOrdersByOrderItemTitleAndDateBetween(
            @Param("searchText") String searchText,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);

    @Query("SELECT COUNT(DISTINCT o) FROM Order o JOIN o.orderItems oi WHERE oi.title LIKE %:searchText% AND o.orderDate BETWEEN :startDate AND :endDate AND o.orderuser.userID = :userId")
    long countOrdersByOrderItemTitleAndUserIdAndDateBetween(
            @Param("searchText") String searchText,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("userId") String userId);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE o.orderDate >= :startDate AND o.orderDate <= :endDate AND o.orderuser.userID = :userId")
    List<Order> findByUserIdAndDateBetween(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate,
            @Param("userId") String userId);

    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE o.orderDate >= :startDate AND o.orderDate <= :endDate")
    List<Order> findByDateBetween(
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
//
//    @Query("SELECT o FROM Order o JOIN o.orderItems oi WHERE oi.title LIKE %:searchText% AND o.orderDate BETWEEN :startDate AND :endDate")
//    List<Order> findByOrderItemTitleAndDateBetween(
//            @Param("searchText") String searchText,
//            @Param("startDate") Date startDate,
//            @Param("endDate") Date endDate);


}
