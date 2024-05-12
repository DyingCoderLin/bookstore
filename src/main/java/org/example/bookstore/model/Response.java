package org.example.bookstore.model;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)//如果值为null就不进行传输
public class Response<T> {
    // 返回给前端的状态码
    private Integer code;
    // 提示信息，如果出现问题前端可以获得提示
    private String message;
    private String cookie;
    // 返回给前端的结果数据
    private T data;

    public Response(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Response(Integer code, T data) {
        this.code = code;
        this.data = data;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCookie() {
        return cookie;
    }

    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    public Response(Integer code, String message,String cookie) {
        this.code = code;
        this.message = message;
        this.cookie = cookie;
    }

    public Response(Integer code, String message, String cookie,T data) {
        this.code = code;
        this.message = message;
        this.cookie = cookie;
        this.data = data;
    }

    public Response(Integer code, String message,T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
