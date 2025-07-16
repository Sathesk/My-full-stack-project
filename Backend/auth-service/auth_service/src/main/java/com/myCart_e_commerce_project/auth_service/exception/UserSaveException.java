package com.myCart_e_commerce_project.auth_service.exception;

public class UserSaveException extends RuntimeException{
    public UserSaveException(String message){
        super(message);
    }

    public UserSaveException(String message, Throwable cause){
        super(message, cause);
    }
}
