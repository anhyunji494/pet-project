package com.project.petproject.config;


import org.springframework.context.annotation.Configuration;
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
}
