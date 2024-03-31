package com.project.petproject.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// Spring의 구성(Configuration) 클래스로 선언합니다.
@Configuration
// WebSocket 메시징 브로커를 활성화하는 어노테이션입니다.
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    // WebSocket 엔드포인트를 등록하는 메서드입니다.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        
        // '/ws'를 엔드포인트로 설정하고 SockJS를 사용하여 등록합니다.
        registry.addEndpoint("/ws").withSockJS();
    }

    // 메시지 브로커를 설정하는 메서드입니다.
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {

        // '/app'으로 시작하는 메시지가 메시지 매핑 컨트롤러로 라우팅되도록 설정합니다.
        registry.setApplicationDestinationPrefixes("/app");
        // '/topic'으로 시작하는 대상(destination)에 대해 메시지를 브로드캐스트하기 위해 간단한 브로커를 활성화합니다.
        registry.enableSimpleBroker("/topic");
    }
}
