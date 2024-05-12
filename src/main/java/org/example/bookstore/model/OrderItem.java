package org.example.bookstore.model;

import jakarta.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer OrderItemID;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "price")
    private Integer price;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "book_id")
    private Book order_book;

    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.DETACH)
    @JoinColumn(name = "order_id")
    private Order order;

    public OrderItem() {
    }

    public OrderItem(Integer quantity, Integer price, Book book, Order order) {
        this.quantity = quantity;
        this.price = price;
        this.order_book = book;
        this.order = order;
    }

    // getters
    public Integer getOrderItemID() { return OrderItemID; }
    public Integer getQuantity() { return quantity; }
    public Integer getPrice() { return price; }
    public Book getBook() { return order_book; }
    public Order getOrder() { return order; }

    // setters
    public void setOrderItemID(Integer OrderItemID) { this.OrderItemID = OrderItemID; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
    public void setPrice(Integer price) { this.price = price; }
    public void setBook(Book book) { this.order_book = book; }
    public void setOrder(Order order) { this.order = order; }
}
