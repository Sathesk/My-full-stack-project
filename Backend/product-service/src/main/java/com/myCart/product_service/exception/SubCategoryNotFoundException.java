package com.myCart.product_service.exception;

public class SubCategoryNotFoundException extends RuntimeException {
    public SubCategoryNotFoundException(String message) {
        super(message);
    }

    public SubCategoryNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}