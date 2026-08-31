package com.qrgenerator.qrgenerator.data.entities;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "users")
@Data
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private Integer id;

    @Column(name = "Name")
    private String name;

    @Column(name = "FatherName")
    private String fatherName;

    @Column(name = "Dob")
    private String dob;

    @Column(name = "PanCard")
    private String panCard;

    @Column(name = "FilePath")
    private String filePath;

}
