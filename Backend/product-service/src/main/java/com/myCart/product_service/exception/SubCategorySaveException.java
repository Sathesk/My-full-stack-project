package com.myCart.product_service.exception;

public class SubCategorySaveException extends RuntimeException{
    public SubCategorySaveException(String message) {
        super(message);
    }

    public SubCategorySaveException(String message, Throwable cause) {
        super(message, cause);
    }
}
