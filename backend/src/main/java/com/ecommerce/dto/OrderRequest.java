package com.ecommerce.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor          
public class OrderRequest {
    private String customerName;
    private String shippingAddress;
    private String phone;
    private List<OrderItemRequest> items;
}
