package com.myCart_eCommerce_project.order_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderResponseDTO {
    private Long orderId;
    private Long buyerId;
    private Instant orderedAt;
    private Double totalAmount;
    private List<OrderItemDTO> items;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class OrderItemDTO {

        private Long productId;
        private Double price;
        private Integer quantity;
    }
}
