package com.qrgenerator.qrgenerator.model.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class DetailResposne {
    private String name;
    private String dob;
    private String panNumber;
    private String fatherName;
    private String image;
}
