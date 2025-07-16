package com.myCart_eCommerce_project.order_service.model.entity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Converter
public class OrderItemListConverter implements AttributeConverter <List<Order.OrderItem>, String>{

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<Order.OrderItem> orderItems){
        try{
            return mapper.writeValueAsString(orderItems);
        }catch (JsonProcessingException e){
            throw new IllegalArgumentException("Could not convert order items to JSON", e);
        }
    }

    @Override
    public List<Order.OrderItem> convertToEntityAttribute(String dbData){
        try{
            return mapper.readValue(dbData, new TypeReference<>() {});
        }catch (IOException e){
            throw new IllegalArgumentException("Could not convert JSON to order items", e);
        }
    }
}
