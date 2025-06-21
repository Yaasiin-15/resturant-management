package com.restaurant.management.repository;

import com.restaurant.management.model.Order;
import com.restaurant.management.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByTableId(Long tableId);
    List<Order> findByStaffId(Long staffId);
    List<Order> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}