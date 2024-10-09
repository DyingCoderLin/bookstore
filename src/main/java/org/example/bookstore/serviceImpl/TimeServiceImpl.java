package org.example.bookstore.serviceImpl;

import org.example.bookstore.service.TimeService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.web.context.annotation.SessionScope;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@Scope("session")
public class TimeServiceImpl implements TimeService {
    private LocalDateTime loginTime;

    // 初始化计时器并开始计时
    public void startTimer() {
        this.loginTime = LocalDateTime.now();
    }

    // 停止计时并返回会话时长（秒）
    public long stopTimer() {
        if (this.loginTime == null) {
            throw new IllegalArgumentException("计时器未启动");
        }
        LocalDateTime logoutTime = LocalDateTime.now();
        Duration sessionDuration = Duration.between(loginTime, logoutTime);
        return sessionDuration.getSeconds();
    }
}
