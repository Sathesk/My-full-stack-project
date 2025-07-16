package com.myCart_e_commerce_project.user_service.exception;

public class AddressSaveException extends RuntimeException{
    public AddressSaveException(String message){
        super(message);
    }

    public AddressSaveException(String message, Throwable cause){
        super(message, cause);
    }

}
