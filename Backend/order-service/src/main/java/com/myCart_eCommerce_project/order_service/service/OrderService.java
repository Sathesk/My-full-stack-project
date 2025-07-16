package com.myCart_eCommerce_project.order_service.service;

import com.myCart_eCommerce_project.order_service.model.dto.OrderDto;
import com.myCart_eCommerce_project.order_service.model.dto.OrderResponseDTO;

public interface OrderService {

    OrderResponseDTO createOrder(OrderDto orderDto);
    OrderResponseDTO getOrderById(Long id);
}
