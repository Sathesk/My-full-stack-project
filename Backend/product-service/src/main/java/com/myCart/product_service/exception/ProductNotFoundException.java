package com.myCart.product_service.exception;

import com.netflix.spectator.impl.Cache;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(String message){
        super(message);
    }

    public ProductNotFoundException(String message, Throwable cause){
        super(message, cause);
    }
}
