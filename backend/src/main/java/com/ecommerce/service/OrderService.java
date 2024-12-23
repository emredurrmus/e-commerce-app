package com.ecommerce.service;

import com.ecommerce.dto.OrderRequest;
import com.ecommerce.dto.OrderItemRequest;
import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import com.ecommerce.model.Product;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPhone(orderRequest.getPhone());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        
        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0.0;

        for (OrderItemRequest itemRequest : orderRequest.getItems()) {
            Product product = productRepository.findById(itemRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(product.getPrice());
            
            orderItems.add(orderItem);
            totalAmount += product.getPrice() * itemRequest.getQuantity();
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);
        
        return orderRepository.save(order);
    }
} 