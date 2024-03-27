package com.project.petprojectconfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(@Nullable WebSocketHandlerRegistry registry) {
        if (registry != null) {
            registry.addHandler(new ChatWebSocketHandler(), "/chat");
        } else {
            // registry가 null인 경우에 대한 처리
        }
    }
}
