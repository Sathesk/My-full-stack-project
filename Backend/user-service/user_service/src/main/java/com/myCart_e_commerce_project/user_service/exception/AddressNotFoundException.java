package com.myCart_e_commerce_project.user_service.exception;

public class AddressNotFoundException extends RuntimeException{
        public AddressNotFoundException(String message){
            super(message);
        }

        public AddressNotFoundException(String message, Throwable cause){
            super(message, cause);
        }

    }
