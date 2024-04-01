package com.project.petproject.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor

public class DetailedFollow extends userDTO {
    private String followTimestamp;

}