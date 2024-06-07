package org.example.bookstore.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class SessionInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            // 处理 session 为空的情况，比如重定向到登录页或抛出异常
            System.out.println("return 401 to Frontend");
            response.setStatus(401);
            return false; // 不继续处理请求
        }
//        System.out.println(session.getId());
//        System.out.println("SessionInterceptor is invoked");
//        System.out.println("Session ID: " + session.getAttribute("userID"));
        if (session != null && session.getAttribute("userID") != null) {
            // session中存在userID，允许请求继续
            return true;
        }
        System.out.println("Session is not logged in yet");
        response.setStatus(400);
        return false;
    }
}