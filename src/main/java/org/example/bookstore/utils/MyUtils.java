package org.example.bookstore.utils;

import jakarta.servlet.http.HttpSession;
import org.springframework.data.relational.core.sql.In;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import jakarta.servlet.http.HttpServletRequest;


public class MyUtils {
    public static void setSession(String userID) {
        ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (servletRequestAttributes != null) {
            HttpServletRequest request = servletRequestAttributes.getRequest();
            HttpSession session = request.getSession();
//            System.out.println("set Session ID: " + session.getId());
            session.setAttribute("userID", userID);
        }
    }

    public static HttpSession getSession() {
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (requestAttributes != null) {
            HttpServletRequest request = requestAttributes.getRequest();
            return request.getSession(false);
        }
        return null;
    }

    public static Double toRMB(Integer price) {
        return price / 100.0;
    }

    public static Integer toCent(String price) {
        return (int) (Double.parseDouble(price) * 100);
    }

    public static Integer toCent(Double price) {
        price = price * 100;
        return price.intValue();
    }

}
