package com.restaurant.management.service;

import com.restaurant.management.model.Order;
import com.restaurant.management.model.OrderItem;
import com.restaurant.management.model.OrderStatus;
import com.restaurant.management.repository.OrderRepository;
import com.restaurant.management.repository.OrderItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * Service class for Order operations
 * Provides business logic for order management
 */
@Service
@Transactional
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    /**
     * Get all orders
     */
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        logger.debug("Fetching all orders");
        return orderRepository.findAll();
    }

    /**
     * Get order by ID
     */
    @Transactional(readOnly = true)
    public Optional<Order> getOrderById(Long id) {
        logger.debug("Fetching order with ID: {}", id);
        return orderRepository.findById(id);
    }

    /**
     * Get orders by status
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByStatus(OrderStatus status) {
        logger.debug("Fetching orders by status: {}", status);
        return orderRepository.findByStatus(status);
    }

    /**
     * Get orders by table ID
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByTableId(Long tableId) {
        logger.debug("Fetching orders by table ID: {}", tableId);
        return orderRepository.findByTableId(tableId);
    }

    /**
     * Get orders by staff ID
     */
    @Transactional(readOnly = true)
    public List<Order> getOrdersByStaffId(Long staffId) {
        logger.debug("Fetching orders by staff ID: {}", staffId);
        return orderRepository.findByStaffId(staffId);
    }

    /**
     * Create new order
     */
    public Order createOrder(Order order) {
        logger.info("Creating new order for table: {}", order.getTable().getId());
        
        validateOrder(order);
        order.setStatus(OrderStatus.PENDING);
        order.setTotalAmount(calculateOrderTotal(order));
        
        return orderRepository.save(order);
    }

    /**
     * Update order
     */
    public Order updateOrder(Long id, Order orderDetails) {
        logger.info("Updating order with ID: {}", id);
        
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        existingOrder.setStatus(orderDetails.getStatus());
        existingOrder.setTotalAmount(orderDetails.getTotalAmount());
        
        return orderRepository.save(existingOrder);
    }

    /**
     * Update order status
     */
    public Order updateOrderStatus(Long id, OrderStatus status) {
        logger.info("Updating order status to {} for order ID: {}", status, id);
        
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        
        order.setStatus(status);
        return orderRepository.save(order);
    }

    /**
     * Delete order
     */
    public void deleteOrder(Long id) {
        logger.info("Deleting order with ID: {}", id);
        
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
        
        orderRepository.delete(order);
    }

    /**
     * Add item to order
     */
    public Order addItemToOrder(Long orderId, OrderItem orderItem) {
        logger.info("Adding item to order ID: {}", orderId);
        
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        
        orderItem.setOrder(order);
        orderItem.setTotalPrice(
            orderItem.getUnitPrice().multiply(BigDecimal.valueOf(orderItem.getQuantity()))
        );
        
        order.getOrderItems().add(orderItem);
        order.setTotalAmount(calculateOrderTotal(order));
        
        return orderRepository.save(order);
    }

    /**
     * Calculate order total
     */
    private BigDecimal calculateOrderTotal(Order order) {
        return order.getOrderItems().stream()
                .map(OrderItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    /**
     * Validate order data
     */
    private void validateOrder(Order order) {
        if (order.getTable() == null) {
            throw new IllegalArgumentException("Order must have a table assigned");
        }
        if (order.getStaff() == null) {
            throw new IllegalArgumentException("Order must have staff assigned");
        }
    }
}