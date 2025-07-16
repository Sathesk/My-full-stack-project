package com.myCart_eCommerce_project.order_service.repository;

import com.myCart_eCommerce_project.order_service.model.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
