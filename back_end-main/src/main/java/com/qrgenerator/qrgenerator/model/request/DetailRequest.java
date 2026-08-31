package com.qrgenerator.qrgenerator.model.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DetailRequest {
    private String name;
    private String fatherName;
    private String dob;
    private String panCard;
    private String image;
    private int width;
    private int height;

}
