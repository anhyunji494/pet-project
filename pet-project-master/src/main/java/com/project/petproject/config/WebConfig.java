package com.project.petproject.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    private String resourcePath = "/images/**"; // view에서 사용할 경로
//    private String savePath = "classpath:/static/images/";

    private String savePath = "file:///C:\\Users\\smhrd\\Desktop\\pet-project-main\\pet-project-master\\src\\main\\resources\\static\\images";
    

//    private String savePath = "file:///C:/development/intellij_community/spring_upload_files/

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(resourcePath)
                .addResourceLocations(savePath);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // 허용할 출처(origin)를 설정합니다.
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드를 설정합니다.
                .allowedHeaders("*"); // 허용할 헤더를 설정합니다. 필요에 따라 수정하세요.
    }
}
