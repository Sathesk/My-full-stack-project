package com.myCart_eCommerce_project.order_service.model.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table(name = "orders")
public class Order{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", unique = true, nullable = false, updatable = false)
    private Long orderId;

    //buyer details
    @Column(name = "buyer_id")
    private Long buyerId;


    @Column(name = "total_price")
    private Double totalPrice;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    @Column(name = "created_at", updatable = false, nullable = false)
    private Instant orderedAt;

    @Lob
    @Convert(converter = OrderItemListConverter.class)
    @Column(name = "items", columnDefinition = "TEXT", nullable = false)
    private List<OrderItem> items;

    //Inner class for OrderItem
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItem{
        private Long productId;
        private Double price;
        private Integer quantity;
    }
}
