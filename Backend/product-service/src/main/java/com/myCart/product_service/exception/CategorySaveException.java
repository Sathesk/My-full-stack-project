package com.myCart.product_service.exception;

public class CategorySaveException extends RuntimeException{

    public CategorySaveException(String message){
        super(message);
    }

    public CategorySaveException(String message, Throwable cause){
        super(message, cause);
    }
}
