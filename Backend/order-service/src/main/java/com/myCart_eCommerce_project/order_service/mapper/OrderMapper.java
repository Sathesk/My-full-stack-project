package com.myCart_eCommerce_project.order_service.mapper;

import com.myCart_eCommerce_project.order_service.model.dto.OrderDto;
import com.myCart_eCommerce_project.order_service.model.dto.OrderResponseDTO;
import com.myCart_eCommerce_project.order_service.model.entity.Order;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class OrderMapper {

    // Convert from OrderDto (request) to Order entity
    public Order toOrder(OrderDto orderDto) {
        List<Order.OrderItem> items = orderDto.getItems().stream()
                .map(itemDto -> new Order.OrderItem(
                        itemDto.getProductId(),
                        itemDto.getPrice(),
                        itemDto.getQuantity()
                ))
                .collect(Collectors.toList());

        return Order.builder()
                .buyerId(orderDto.getBuyerId())
                .totalPrice(orderDto.getTotalAmount())
                .items(items)
                .build();
    }

    // Convert from Order entity to OrderResponseDTO (response)
    public OrderResponseDTO toOrderResponseDTO(Order order) {
        List<OrderResponseDTO.OrderItemDTO> items = order.getItems().stream()
                .map(item -> new OrderResponseDTO.OrderItemDTO(
                        item.getProductId(),
                        item.getPrice(),
                        item.getQuantity()
                ))
                .collect(Collectors.toList());

        return new OrderResponseDTO(
                order.getOrderId(),
                order.getBuyerId(),
                order.getOrderedAt(),
                order.getTotalPrice(),
                items
        );
    }
}
