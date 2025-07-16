package com.myCart_eCommerce_project.order_service.service.impl;

import com.myCart_eCommerce_project.order_service.mapper.OrderMapper;
import com.myCart_eCommerce_project.order_service.model.dto.OrderDto;
import com.myCart_eCommerce_project.order_service.model.dto.OrderResponseDTO;
import com.myCart_eCommerce_project.order_service.model.entity.Order;
import com.myCart_eCommerce_project.order_service.repository.OrderRepository;
import com.myCart_eCommerce_project.order_service.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    @Override
    public OrderResponseDTO createOrder(OrderDto orderDto) {
        Order order = orderMapper.toOrder(orderDto);
        Order saved = orderRepository.save(order);
        return orderMapper.toOrderResponseDTO(saved);
    }

    @Override
    public OrderResponseDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        return orderMapper.toOrderResponseDTO(order);
    }
}
